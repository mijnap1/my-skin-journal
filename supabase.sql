create extension if not exists pgcrypto with schema extensions;

create table if not exists public.skin_journal_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.skin_journal_sessions (
  token uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.skin_journal_users (id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '30 days'
);

create table if not exists public.skin_journal_routines (
  user_id uuid primary key references public.skin_journal_users (id) on delete cascade,
  routine jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.skin_journal_users disable row level security;
alter table public.skin_journal_sessions disable row level security;
alter table public.skin_journal_routines disable row level security;

revoke all on public.skin_journal_users from anon, authenticated;
revoke all on public.skin_journal_sessions from anon, authenticated;
revoke all on public.skin_journal_routines from anon, authenticated;

create or replace function public.skin_journal_sign_up(p_password text, p_username text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_username text;
  v_user_id uuid;
  v_token uuid;
begin
  v_username := lower(trim(p_username));

  if v_username = '' or length(v_username) < 3 then
    raise exception 'USERNAME_TOO_SHORT';
  end if;

  if length(p_password) < 6 then
    raise exception 'PASSWORD_TOO_SHORT';
  end if;

  insert into public.skin_journal_users (username, password_hash)
  values (v_username, extensions.crypt(p_password, extensions.gen_salt('bf')))
  returning id into v_user_id;

  insert into public.skin_journal_sessions (user_id)
  values (v_user_id)
  returning token into v_token;

  insert into public.skin_journal_routines (user_id, routine)
  values (v_user_id, '[]'::jsonb)
  on conflict (user_id) do nothing;

  return jsonb_build_object(
    'token', v_token,
    'username', v_username
  );
exception
  when unique_violation then
    raise exception 'USERNAME_TAKEN';
end;
$$;

create or replace function public.skin_journal_sign_in(p_password text, p_username text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_username text;
  v_user_id uuid;
  v_hash text;
  v_token uuid;
begin
  v_username := lower(trim(p_username));

  select id, password_hash
  into v_user_id, v_hash
  from public.skin_journal_users
  where username = v_username;

  if v_user_id is null or v_hash <> extensions.crypt(p_password, v_hash) then
    raise exception 'INVALID_CREDENTIALS';
  end if;

  insert into public.skin_journal_sessions (user_id)
  values (v_user_id)
  returning token into v_token;

  return jsonb_build_object(
    'token', v_token,
    'username', v_username
  );
end;
$$;

create or replace function public.skin_journal_get_session(p_token uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_username text;
  v_user_id uuid;
begin
  delete from public.skin_journal_sessions
  where expires_at < now();

  select u.id, u.username
  into v_user_id, v_username
  from public.skin_journal_sessions s
  join public.skin_journal_users u on u.id = s.user_id
  where s.token = p_token
    and s.expires_at >= now();

  if v_user_id is null then
    return null;
  end if;

  return jsonb_build_object(
    'user_id', v_user_id,
    'username', v_username
  );
end;
$$;

create or replace function public.skin_journal_sign_out(p_token uuid)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  delete from public.skin_journal_sessions where token = p_token;
end;
$$;

create or replace function public.skin_journal_get_routine(p_token uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_user_id uuid;
  v_routine jsonb;
begin
  select s.user_id
  into v_user_id
  from public.skin_journal_sessions s
  where s.token = p_token
    and s.expires_at >= now();

  if v_user_id is null then
    raise exception 'INVALID_SESSION';
  end if;

  select routine
  into v_routine
  from public.skin_journal_routines
  where user_id = v_user_id;

  return coalesce(v_routine, '[]'::jsonb);
end;
$$;

create or replace function public.skin_journal_save_routine(p_token uuid, p_routine jsonb)
returns void
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_user_id uuid;
begin
  select s.user_id
  into v_user_id
  from public.skin_journal_sessions s
  where s.token = p_token
    and s.expires_at >= now();

  if v_user_id is null then
    raise exception 'INVALID_SESSION';
  end if;

  insert into public.skin_journal_routines (user_id, routine, updated_at)
  values (v_user_id, p_routine, now())
  on conflict (user_id)
  do update set
    routine = excluded.routine,
    updated_at = now();
end;
$$;

grant execute on function public.skin_journal_sign_up(text, text) to anon, authenticated;
grant execute on function public.skin_journal_sign_in(text, text) to anon, authenticated;
grant execute on function public.skin_journal_get_session(uuid) to anon, authenticated;
grant execute on function public.skin_journal_sign_out(uuid) to anon, authenticated;
grant execute on function public.skin_journal_get_routine(uuid) to anon, authenticated;
grant execute on function public.skin_journal_save_routine(uuid, jsonb) to anon, authenticated;
