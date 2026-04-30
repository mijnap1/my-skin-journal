const STORAGE_KEY = "my-skin-journal-routine-v1";
const THEME_STORAGE_KEY = "my-skin-journal-theme";
const SESSION_STORAGE_KEY = "my-skin-journal-session";
const SUPABASE_URL = "https://vglbxczlwztpwdpvcmte.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_xruzoF0QoYwU5V7nHspv1g_yfICa38n";
const TIMELINE_WINDOW_DAYS = 21;
const TIMELINE_APPEND_DAYS = 7;
const KOREAN_WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const legacySampleRoutine = [
  {
    day: "월",
    morning: "물 or 폼 → 수분엠플/세럼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "폼",
    skincare: "비타민C → 수분크림 → (필요 시) 에스트라",
    extraCare: "면도",
    done: false,
    notes: "",
  },
  {
    day: "화",
    morning: "물 or 폼 → 수분엠플/세럼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "오일 → 폼",
    skincare: "레티놀 → 수분크림 → 에스트라",
    extraCare: "코털 정리",
    done: false,
    notes: "",
  },
  {
    day: "수",
    morning: "물 or 폼 → 수분엠플/세럼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "폼",
    skincare: "비타민C → 수분크림 → (필요 시) 에스트라",
    extraCare: "면도",
    done: false,
    notes: "",
  },
  {
    day: "목",
    morning: "물 or 폼 → 수분엠플/세럼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "폼",
    skincare: "비타민C → 수분크림 → (필요 시) 에스트라",
    extraCare: "없음",
    done: false,
    notes: "",
  },
  {
    day: "금",
    morning: "물 or 폼 → 수분엠플/세럼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "오일 → 폼",
    skincare: "레티놀 → 수분크림 → 에스트라",
    extraCare: "면도",
    done: false,
    notes: "",
  },
  {
    day: "토",
    morning: "물 or 폼 → 수분엠플/세럼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "폼",
    skincare: "클레이 → 토너 → 수분크림 → 에스트라",
    extraCare: "코털 정리",
    done: false,
    notes: "",
  },
  {
    day: "일",
    morning: "물 or 폼 → 수분엠플/세럼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "폼",
    skincare: "비타민C → 수분·진정 마스크팩 → 수분크림 → (필요 시) 에스트라",
    extraCare: "면도",
    done: false,
    notes: "",
  },
];

const tableBody = document.getElementById("routineTableBody");
const mobileCards = document.getElementById("mobileCards");
const saveStatus = document.getElementById("saveStatus");
const themeToggle = document.getElementById("themeToggle");
const settingsButton = document.getElementById("settingsButton");
const settingsPanel = document.getElementById("settingsPanel");
const exportButton = document.getElementById("exportButton");
const importButton = document.getElementById("importButton");
const importFileInput = document.getElementById("importFileInput");
const prevWeekButton = document.getElementById("prevWeekButton");
const nextWeekButton = document.getElementById("nextWeekButton");
const weekRangeLabel = document.getElementById("weekRangeLabel");
const journalSummary = document.getElementById("journalSummary");
const authCard = document.getElementById("authCard");
const appContent = document.getElementById("appContent");
const authStatus = document.getElementById("authStatus");
const authUserEmail = document.getElementById("authUserEmail");
const logoutButton = document.getElementById("logoutButton");
const authForm = document.getElementById("authForm");
const authUsername = document.getElementById("authUsername");
const authPassword = document.getElementById("authPassword");
const authMessage = document.getElementById("authMessage");
const authSubmit = document.getElementById("authSubmit");
const signInTab = document.getElementById("signInTab");
const signUpTab = document.getElementById("signUpTab");

let routineData = loadRoutine();
let currentTheme = loadTheme();
let mobileOpenDay = getTodayIndex();
let mobileEditDay = null;
let authMode = "sign-in";
let supabaseClient = null;
let currentUser = null;
let currentSessionToken = loadSessionToken();
let remoteSaveTimer = null;
let visibleWeekStart = 0;
let isSettingsOpen = false;
const moodOptions = [
  { value: "calm", label: "Calm", icon: "leaf-outline" },
  { value: "glowy", label: "Glowy", icon: "sparkles-outline" },
  { value: "dry", label: "Dry", icon: "water-outline" },
  { value: "sensitive", label: "Sensitive", icon: "rose-outline" },
];

function normalizeMorningRoutine(morning) {
  if (typeof morning !== "string" || !morning.includes("나이아신아마이드")) {
    return typeof morning === "string" ? morning : "";
  }

  if (morning.includes("수분엠플/세럼")) {
    return morning;
  }

  return morning.replace(
    "나이아신아마이드",
    "수분엠플/세럼 → 나이아신아마이드"
  );
}

function getRoutineParts(value) {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(/\n|→/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getTodayDateKey() {
  return formatDateKey(new Date());
}

function addDays(dateKey, days) {
  const date = parseDateKey(dateKey);
  date.setDate(date.getDate() + days);
  return formatDateKey(date);
}

function getWeekdayLabel(dateKey) {
  return KOREAN_WEEKDAYS[parseDateKey(dateKey).getDay()];
}

function formatDateLabel(dateKey) {
  const date = parseDateKey(dateKey);
  return `${date.getMonth() + 1}.${date.getDate()}`;
}

function createEmptyEntry(dateKey) {
  return {
    date: dateKey,
    morning: "",
    eveningCleanse: "",
    skincare: "",
    extraCare: "",
    mood: "",
    done: false,
    notes: "",
  };
}

function createEmptyTimeline(startDateKey = getTodayDateKey(), days = TIMELINE_WINDOW_DAYS) {
  return Array.from({ length: days }, (_, index) => createEmptyEntry(addDays(startDateKey, index)));
}

function isLegacyWeeklyData(data) {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every((entry) => typeof entry?.day === "string" && !entry?.date)
  );
}

function isDatedTimeline(data) {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every((entry) => typeof entry?.date === "string")
  );
}

function hasMeaningfulRoutine(data) {
  if (!Array.isArray(data) || !data.length) {
    return false;
  }

  return data.some((entry) =>
    [entry.morning, entry.eveningCleanse, entry.skincare, entry.extraCare, entry.notes]
      .some((value) => typeof value === "string" && value.trim())
  );
}

function normalizeTimelineEntries(entries) {
  if (!Array.isArray(entries)) {
    return createEmptyTimeline();
  }

  const normalized = entries
    .filter((entry) => entry && typeof entry.date === "string")
    .map((entry) => ({
      date: entry.date,
      morning: normalizeMorningRoutine(entry.morning),
      eveningCleanse: typeof entry.eveningCleanse === "string" ? entry.eveningCleanse : "",
      skincare: typeof entry.skincare === "string" ? entry.skincare : "",
      extraCare: typeof entry.extraCare === "string" ? entry.extraCare : "",
      mood: typeof entry.mood === "string" ? entry.mood : "",
      done: Boolean(entry.done),
      notes: typeof entry.notes === "string" ? entry.notes : "",
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return ensureTimelineWindow(normalized);
}

function migrateLegacyRoutineToTimeline(data) {
  const baseDate = getTodayDateKey();
  const source = Array.isArray(data) && data.length ? data : legacySampleRoutine;
  const entries = source.map((entry, index) => ({
    date: addDays(baseDate, index),
    morning: normalizeMorningRoutine(entry.morning),
    eveningCleanse: typeof entry.eveningCleanse === "string" ? entry.eveningCleanse : "",
    skincare: typeof entry.skincare === "string" ? entry.skincare : "",
    extraCare: typeof entry.extraCare === "string" ? entry.extraCare : "",
    mood: typeof entry.mood === "string" ? entry.mood : "",
    done: Boolean(entry.done),
    notes: typeof entry.notes === "string" ? entry.notes : "",
  }));

  return ensureTimelineWindow(entries);
}

function ensureTimelineWindow(entries) {
  if (!Array.isArray(entries) || !entries.length) {
    return createEmptyTimeline();
  }

  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const timeline = [];
  const firstDate = sorted[0].date;
  const targetLength = Math.max(TIMELINE_WINDOW_DAYS, sorted.length);
  const entryMap = new Map(sorted.map((entry) => [entry.date, entry]));

  for (let index = 0; index < targetLength; index += 1) {
    const dateKey = addDays(firstDate, index);
    timeline.push(entryMap.get(dateKey) || createEmptyEntry(dateKey));
  }

  const todayKey = getTodayDateKey();
  while (timeline[timeline.length - 1].date < todayKey) {
    timeline.push(createEmptyEntry(addDays(timeline[timeline.length - 1].date, 1)));
  }

  return timeline;
}

function normalizeRoutineData(data) {
  if (isDatedTimeline(data)) {
    return normalizeTimelineEntries(data);
  }

  if (isLegacyWeeklyData(data)) {
    return migrateLegacyRoutineToTimeline(data);
  }

  if (Array.isArray(data) && !data.length) {
    return createEmptyTimeline();
  }

  return createEmptyTimeline();
}

function loadRoutine() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return createEmptyTimeline();
    }

    const parsed = JSON.parse(saved);
    const normalized = normalizeRoutineData(parsed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  } catch (error) {
    console.warn("Failed to read saved routine:", error);
    return createEmptyTimeline();
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  return "dark";
}

function loadSessionToken() {
  return localStorage.getItem(SESSION_STORAGE_KEY) || "";
}

function hasSupabaseConfig() {
  return (
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    SUPABASE_URL !== "YOUR_SUPABASE_URL" &&
    SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY"
  );
}

function initSupabase() {
  if (!hasSupabaseConfig() || !window.supabase?.createClient) {
    return null;
  }

  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function normalizeUsername(username) {
  return username.trim().toLowerCase();
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.innerHTML =
    theme === "dark"
      ? '<ion-icon name="sunny-outline" aria-hidden="true"></ion-icon><span>Light mode</span>'
      : '<ion-icon name="moon-outline" aria-hidden="true"></ion-icon><span>Dark mode</span>';
  themeToggle.setAttribute("aria-pressed", String(theme === "light"));
}

function toggleTheme() {
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
}

function setSettingsOpen(nextState) {
  isSettingsOpen = nextState;
  settingsPanel.hidden = !nextState;
  settingsButton.setAttribute("aria-expanded", String(nextState));
}

function toggleSettingsMenu() {
  setSettingsOpen(!isSettingsOpen);
}

function flashStatus(message, stateClass = "") {
  if (saveStatus.hidden) {
    return;
  }

  saveStatus.textContent = message;
  saveStatus.classList.remove("saved", "reset");
  if (stateClass) {
    saveStatus.classList.add(stateClass);
  }

  window.clearTimeout(flashStatus.timer);
  flashStatus.timer = window.setTimeout(() => {
    saveStatus.textContent = "로컬에 자동 저장됨";
    saveStatus.classList.remove("saved", "reset");
  }, 1800);
}

function saveRoutine(message = "로컬에 자동 저장됨", stateClass = "saved") {
  routineData = ensureTimelineWindow(routineData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(routineData));
  queueRemoteSave();
  flashStatus(message, stateClass);
}

function setAuthMessage(message, tone = "") {
  authMessage.textContent = message;
  authMessage.classList.remove("error", "success");
  if (tone) {
    authMessage.classList.add(tone);
  }
}

function setAuthMode(mode) {
  authMode = mode;
  const isSignIn = mode === "sign-in";
  signInTab.classList.toggle("is-active", isSignIn);
  signUpTab.classList.toggle("is-active", !isSignIn);
  signInTab.setAttribute("aria-selected", String(isSignIn));
  signUpTab.setAttribute("aria-selected", String(!isSignIn));
  authSubmit.innerHTML = isSignIn
    ? '<ion-icon name="log-in-outline" aria-hidden="true"></ion-icon><span>로그인</span>'
    : '<ion-icon name="person-add-outline" aria-hidden="true"></ion-icon><span>회원가입</span>';
  authPassword.autocomplete = isSignIn ? "current-password" : "new-password";
}

function updateAuthUI() {
  const isLoggedIn = Boolean(currentUser);
  authCard.hidden = isLoggedIn;
  appContent.hidden = !isLoggedIn;
  authStatus.hidden = !isLoggedIn;

  if (isLoggedIn) {
    authUserEmail.textContent = currentUser.username || "";
  } else {
    authUserEmail.textContent = "";
  }
}

async function loadRemoteRoutine() {
  if (!supabaseClient || !currentSessionToken) {
    return;
  }

  const { data, error } = await supabaseClient.rpc("skin_journal_get_routine", {
    p_token: currentSessionToken,
  });

  if (error) {
    setAuthMessage(`루틴 불러오기 실패: ${error.message}`, "error");
    return;
  }

  const remoteRoutine = normalizeRoutineData(Array.isArray(data) ? data : []);

  if (!hasMeaningfulRoutine(remoteRoutine) && hasMeaningfulRoutine(routineData)) {
    saveRoutine("현재 기기 루틴을 계정에 저장했어요.");
    return;
  }

  routineData = remoteRoutine;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(routineData));
}

async function saveRoutineRemote() {
  if (!supabaseClient || !currentSessionToken) {
    return;
  }

  const { error } = await supabaseClient.rpc("skin_journal_save_routine", {
    p_token: currentSessionToken,
    p_routine: routineData,
  });

  if (error) {
    setAuthMessage(`루틴 저장 실패: ${error.message}`, "error");
  }
}

function queueRemoteSave() {
  if (!supabaseClient || !currentSessionToken) {
    return;
  }

  window.clearTimeout(remoteSaveTimer);
  remoteSaveTimer = window.setTimeout(() => {
    saveRoutineRemote();
  }, 500);
}

async function handleAuthSubmit(event) {
  event.preventDefault();

  if (!supabaseClient) {
    setAuthMessage("먼저 script.js에 Supabase URL과 anon key를 넣어야 합니다.", "error");
    return;
  }

  const username = authUsername.value.trim();
  const password = authPassword.value;

  if (!username || !password) {
    setAuthMessage("이름과 비밀번호를 입력해 주세요.", "error");
    return;
  }

  if (normalizeUsername(username).length < 3) {
    setAuthMessage("이름은 3자 이상으로 입력해 주세요.", "error");
    return;
  }

  authSubmit.disabled = true;

  const rpcName =
    authMode === "sign-in" ? "skin_journal_sign_in" : "skin_journal_sign_up";

  const { data, error } = await supabaseClient.rpc(rpcName, {
    p_username: normalizeUsername(username),
    p_password: password,
  });

  authSubmit.disabled = false;

  if (error) {
    const messageMap = {
      INVALID_CREDENTIALS: "이름 또는 비밀번호가 맞지 않습니다.",
      USERNAME_TAKEN: "이미 사용 중인 이름입니다.",
      USERNAME_TOO_SHORT: "이름은 3자 이상으로 입력해 주세요.",
      PASSWORD_TOO_SHORT: "비밀번호는 6자 이상이어야 합니다.",
    };
    setAuthMessage(messageMap[error.message] || error.message, "error");
    return;
  }

  currentSessionToken = data.token;
  localStorage.setItem(SESSION_STORAGE_KEY, currentSessionToken);
  currentUser = {
    username: data.username,
  };

  if (authMode === "sign-up") {
    routineData = createEmptyTimeline();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routineData));
    await saveRoutineRemote();
  } else {
    await loadRemoteRoutine();
  }

  updateAuthUI();
  visibleWeekStart = getWeekStartIndex();
  mobileOpenDay = getTodayIndex();
  render();
  authForm.reset();

  setAuthMessage(
    authMode === "sign-in" ? "로그인되었습니다." : "회원가입이 완료되었습니다.",
    "success"
  );
}

async function handleLogout() {
  if (supabaseClient && currentSessionToken) {
    const { error } = await supabaseClient.rpc("skin_journal_sign_out", {
      p_token: currentSessionToken,
    });
    if (error) {
      setAuthMessage(error.message, "error");
      return;
    }
  }

  currentSessionToken = "";
  currentUser = null;
  localStorage.removeItem(SESSION_STORAGE_KEY);
  routineData = loadRoutine();
  visibleWeekStart = getWeekStartIndex();
  mobileOpenDay = getTodayIndex();
  mobileEditDay = null;
  updateAuthUI();
  render();
  setAuthMessage("로그아웃되었습니다.", "success");
}

async function syncSession() {
  if (!supabaseClient || !currentSessionToken) {
    currentUser = null;
    updateAuthUI();
    setAuthMessage(
      hasSupabaseConfig()
        ? "이름과 비밀번호로 로그인하거나 회원가입하세요."
        : "script.js에 Supabase URL과 anon key를 넣으면 로그인 기능이 활성화됩니다."
    );
    return;
  }

  const { data, error } = await supabaseClient.rpc("skin_journal_get_session", {
    p_token: currentSessionToken,
  });

  if (error || !data) {
    currentSessionToken = "";
    currentUser = null;
    localStorage.removeItem(SESSION_STORAGE_KEY);
    updateAuthUI();
    setAuthMessage("세션이 만료되었습니다. 다시 로그인해 주세요.");
    return;
  }

  currentUser = data;
  updateAuthUI();
  await loadRemoteRoutine();
  visibleWeekStart = getWeekStartIndex();
  mobileOpenDay = getTodayIndex();
  render();
  setAuthMessage("계정 루틴을 불러왔습니다.", "success");
}

function getTodayIndex() {
  const todayKey = getTodayDateKey();
  const foundIndex = routineData.findIndex((entry) => entry.date === todayKey);
  return foundIndex >= 0 ? foundIndex : 0;
}

function getWeekStartIndex(index = getTodayIndex()) {
  return Math.max(0, Math.floor(index / 7) * 7);
}

function getMoodMeta(value) {
  return moodOptions.find((option) => option.value === value) || null;
}

function ensureVisibleWeekRange() {
  if (visibleWeekStart < 0) {
    visibleWeekStart = 0;
  }

  while (visibleWeekStart + 7 > routineData.length) {
    appendMoreDays(TIMELINE_APPEND_DAYS, false);
  }
}

function getVisibleEntries() {
  ensureVisibleWeekRange();
  return routineData
    .slice(visibleWeekStart, visibleWeekStart + 7)
    .map((entry, offset) => ({
      entry,
      actualIndex: visibleWeekStart + offset,
    }));
}

function updateWeekRangeLabel() {
  const visibleEntries = getVisibleEntries();
  if (!visibleEntries.length) {
    weekRangeLabel.textContent = "";
    return;
  }

  const firstDate = visibleEntries[0].entry.date;
  const lastDate = visibleEntries[visibleEntries.length - 1].entry.date;
  weekRangeLabel.textContent = `${formatDateLabel(firstDate)} - ${formatDateLabel(lastDate)}`;
  prevWeekButton.disabled = visibleWeekStart === 0;
}

function getWeekProgress() {
  const entries = getVisibleEntries().map((item) => item.entry);
  const doneCount = entries.filter((entry) => entry.done).length;
  return {
    doneCount,
    total: entries.length,
    percentage: entries.length ? Math.round((doneCount / entries.length) * 100) : 0,
  };
}

function getCurrentStreak() {
  let streak = 0;
  const todayIndex = getTodayIndex();
  for (let index = todayIndex; index >= 0; index -= 1) {
    if (!routineData[index]?.done) {
      break;
    }
    streak += 1;
  }
  return streak;
}

function getEntryFilledCount(entry) {
  return [entry.morning, entry.eveningCleanse, entry.skincare, entry.extraCare, entry.notes]
    .filter((value) => typeof value === "string" && value.trim()).length;
}

function updateMood(index, mood) {
  routineData[index].mood = routineData[index].mood === mood ? "" : mood;
  saveRoutine("오늘 피부 무드를 저장했어요.");
  render();
}

function renderJournalSummary() {
  const todayIndex = getTodayIndex();
  const todayEntry = routineData[todayIndex] || createEmptyEntry(getTodayDateKey());
  const weekProgress = getWeekProgress();
  const streak = getCurrentStreak();
  const moodMeta = getMoodMeta(todayEntry.mood);

  journalSummary.innerHTML = `
    <div class="summary-overview">
      <div class="summary-copy">
        <p class="summary-kicker">Today Journal</p>
        <h3>${formatDateLabel(todayEntry.date)} · ${getWeekdayLabel(todayEntry.date)}요일</h3>
        <p class="summary-text">
          ${moodMeta ? `${moodMeta.label} mood selected.` : "오늘 피부 컨디션을 골라두면 기록이 더 쉬워져요."}
        </p>
      </div>
      <div class="summary-progress">
        <div class="summary-progress-ring">
          <strong>${weekProgress.percentage}%</strong>
          <span>this week</span>
        </div>
      </div>
    </div>
    <div class="summary-stats">
      <div class="summary-stat">
        <span class="summary-stat-label">Completed</span>
        <strong>${weekProgress.doneCount}/${weekProgress.total}</strong>
      </div>
      <div class="summary-stat">
        <span class="summary-stat-label">Streak</span>
        <strong>${streak} day${streak === 1 ? "" : "s"}</strong>
      </div>
      <div class="summary-stat">
        <span class="summary-stat-label">Entries</span>
        <strong>${getEntryFilledCount(todayEntry)} filled</strong>
      </div>
    </div>
    <div class="summary-bar">
      <span class="summary-bar-fill" style="width: ${weekProgress.percentage}%"></span>
    </div>
    <div class="mood-picker">
      ${moodOptions
        .map(
          (option) => `
            <button
              class="mood-chip${todayEntry.mood === option.value ? " is-active" : ""}"
              type="button"
              data-mood="${option.value}"
              aria-pressed="${String(todayEntry.mood === option.value)}"
            >
              <ion-icon name="${option.icon}" aria-hidden="true"></ion-icon>
              <span>${option.label}</span>
            </button>
          `
        )
        .join("")}
    </div>
  `;

  journalSummary.querySelectorAll(".mood-chip").forEach((button) => {
    button.addEventListener("click", () => updateMood(todayIndex, button.dataset.mood));
  });
}

function createTextarea(value, index, field, extraClass = "") {
  const textarea = document.createElement("textarea");
  textarea.className = extraClass;
  textarea.value = value;
  textarea.setAttribute("data-index", index);
  textarea.setAttribute("data-field", field);
  return textarea;
}

function createCheckbox(checked, index) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "done-checkbox";
  checkbox.checked = checked;
  checkbox.setAttribute("data-index", index);
  checkbox.addEventListener("change", handleDoneToggle);
  checkbox.setAttribute("aria-label", `${routineData[index].date} 완료 체크`);
  return checkbox;
}

function createRoutineDisplay(value, index, field, isNotes = false) {
  const display = document.createElement("div");
  display.className = `cell-display is-editable${isNotes ? " note-display" : ""}`;
  display.tabIndex = 0;
  display.setAttribute("role", "button");
  display.setAttribute(
    "aria-label",
    `${routineData[index].date} ${field} ${isNotes ? "노트" : "루틴"} 더블클릭 편집`
  );
  display.dataset.index = index;
  display.dataset.field = field;
  display.addEventListener("dblclick", () =>
    activateInlineEditor(display, index, field, isNotes)
  );
  display.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateInlineEditor(display, index, field, isNotes);
    }
  });

  if (isNotes) {
    const note = document.createElement("div");
    note.className = "note-text";
    note.textContent = value.trim() ? value : "메모를 남겨보세요.";
    if (!value.trim()) {
      note.classList.add("cell-placeholder");
    }
    display.appendChild(note);
    return display;
  }

  if (!value.trim()) {
    const empty = document.createElement("span");
    empty.className = "cell-placeholder";
    empty.textContent = "더블클릭해서 루틴을 입력하세요.";
    display.appendChild(empty);
    return display;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "routine-steps";
  getRoutineParts(value).forEach((part) => {
      const step = document.createElement("span");
      step.className = "routine-step";
      if (/레티놀|비타민C|클레이|마스크팩|에스트라|선크림|나이아신아마이드/.test(part)) {
        step.classList.add("is-emphasis");
      }
      step.textContent = part;
      wrapper.appendChild(step);
    });

  display.appendChild(wrapper);
  return display;
}

function activateInlineEditor(display, index, field, isNotes = false) {
  const textarea = createTextarea(
    routineData[index][field],
    index,
    field,
    isNotes ? "note-input" : "editable-cell"
  );

  let isFinished = false;

  const finishEdit = (shouldSave) => {
    if (isFinished) {
      return;
    }
    isFinished = true;

    if (shouldSave) {
      routineData[index][field] = textarea.value.trim();
      saveRoutine("수정 내용 저장됨");
    }
    render();
  };

  textarea.addEventListener("blur", () => finishEdit(true), { once: true });
  textarea.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      finishEdit(false);
    }

    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      textarea.blur();
    }
  });

  display.replaceWith(textarea);
  textarea.focus();
  textarea.setSelectionRange(textarea.value.length, textarea.value.length);
}

function handleDoneToggle(event) {
  const index = Number(event.target.dataset.index);
  routineData[index].done = event.target.checked;
  saveRoutine(event.target.checked ? "오늘 루틴 체크 완료" : "체크 해제됨");
  render();
}

function updateField(index, field, value, message = "수정 내용 저장됨") {
  routineData[index][field] = value.trim();
  saveRoutine(message);
}

function toggleMobileOpen(index) {
  mobileOpenDay = mobileOpenDay === index ? null : index;
  if (mobileOpenDay !== index && mobileEditDay === index) {
    mobileEditDay = null;
  }
  renderMobileCards();
}

function toggleMobileEdit(index) {
  mobileOpenDay = index;
  mobileEditDay = mobileEditDay === index ? null : index;
  renderMobileCards();
}

function createMobileEditor(index, field, value, isNotes = false) {
  const textarea = createTextarea(
    value,
    index,
    field,
    isNotes ? "mobile-textarea note" : "mobile-textarea"
  );
  textarea.addEventListener("input", (event) => {
    updateField(index, field, event.target.value, "모바일에서 저장됨");
  });
  return textarea;
}

function createMobileField(label, icon, index, field, value, isEditing, isNotes = false) {
  const section = document.createElement("section");
  section.className = "mobile-field";
  section.innerHTML = `
    <div class="mobile-field-head">
      <span class="mobile-field-label">
        <ion-icon name="${icon}" aria-hidden="true"></ion-icon>
        <span>${label}</span>
      </span>
    </div>
  `;

  if (isEditing) {
    section.appendChild(createMobileEditor(index, field, value, isNotes));
  } else {
    section.appendChild(createRoutineDisplay(value, index, field, isNotes));
  }

  return section;
}

function renderTable() {
  tableBody.innerHTML = "";
  const todayKey = getTodayDateKey();

  getVisibleEntries().forEach(({ entry, actualIndex }) => {
    const row = document.createElement("tr");
    if (entry.date === todayKey) {
      row.classList.add("today-row");
    }

    const dateCell = document.createElement("td");
    const moodMeta = getMoodMeta(entry.mood);
    dateCell.innerHTML = `
      <div class="day-chip">
        <span>${formatDateLabel(entry.date)}</span>
        ${entry.date === todayKey ? '<span class="today-badge">Today</span>' : ""}
      </div>
      <div class="day-sub">${getWeekdayLabel(entry.date)}요일</div>
      ${moodMeta ? `<div class="table-mood"><ion-icon name="${moodMeta.icon}" aria-hidden="true"></ion-icon><span>${moodMeta.label}</span></div>` : ""}
    `;

    const morningCell = document.createElement("td");
    morningCell.appendChild(createRoutineDisplay(entry.morning, actualIndex, "morning"));

    const eveningCell = document.createElement("td");
    eveningCell.appendChild(
      createRoutineDisplay(entry.eveningCleanse, actualIndex, "eveningCleanse")
    );

    const skincareCell = document.createElement("td");
    skincareCell.appendChild(createRoutineDisplay(entry.skincare, actualIndex, "skincare"));

    const extraCell = document.createElement("td");
    extraCell.appendChild(createRoutineDisplay(entry.extraCare, actualIndex, "extraCare"));

    const doneCell = document.createElement("td");
    doneCell.className = "checkbox-wrap";
    doneCell.appendChild(createCheckbox(entry.done, actualIndex));

    const noteCell = document.createElement("td");
    noteCell.appendChild(createRoutineDisplay(entry.notes, actualIndex, "notes", true));

    row.append(
      dateCell,
      morningCell,
      eveningCell,
      skincareCell,
      extraCell,
      doneCell,
      noteCell
    );
    tableBody.appendChild(row);
  });
}

function renderMobileCards() {
  mobileCards.innerHTML = "";
  const todayKey = getTodayDateKey();

  getVisibleEntries().forEach(({ entry, actualIndex }) => {
    const card = document.createElement("article");
    const isOpen = mobileOpenDay === actualIndex;
    const isEditing = mobileEditDay === actualIndex;
    card.className = `routine-mobile-card card${isOpen ? " is-open" : ""}${
      isEditing ? " is-editing" : ""
    }`;

    const skincareSummary = entry.skincare.trim()
      ? getRoutineParts(entry.skincare)[0] || "루틴 비어 있음"
      : "루틴 비어 있음";
    const extraSummary = entry.extraCare.trim() || "추가 케어 없음";
    const moodMeta = getMoodMeta(entry.mood);

    card.innerHTML = `
      <div class="mobile-card-head">
        <div class="mobile-card-main">
          <div class="mobile-day-wrap">
            <div class="mobile-day ${entry.date === todayKey ? "today-label" : ""}">
              ${formatDateLabel(entry.date)}
            </div>
            <div class="mobile-weekday">${getWeekdayLabel(entry.date)}요일</div>
            ${
              entry.date === todayKey
                ? '<span class="today-badge mobile-today-badge">Today</span>'
                : ""
            }
          </div>
          ${moodMeta ? `<div class="mobile-mood"><ion-icon name="${moodMeta.icon}" aria-hidden="true"></ion-icon><span>${moodMeta.label}</span></div>` : ""}
          <div class="mobile-card-summary">
            <span>${skincareSummary}</span>
            <span class="mobile-summary-dot"></span>
            <span>${extraSummary}</span>
          </div>
        </div>
        <div class="mobile-card-actions">
          <label class="mobile-done-toggle" aria-label="${entry.date} 완료 체크">
            <span>Done</span>
          </label>
          <button class="mobile-icon-button mobile-edit-button" type="button" aria-label="Edit ${entry.date}">
            <ion-icon name="${isEditing ? "checkmark-outline" : "create-outline"}" aria-hidden="true"></ion-icon>
          </button>
          <button class="mobile-icon-button mobile-expand-button" type="button" aria-expanded="${String(
            isOpen
          )}" aria-label="${entry.date} details">
            <ion-icon name="${isOpen ? "chevron-up-outline" : "chevron-down-outline"}" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </div>
      <div class="mobile-card-body" ${isOpen ? "" : "hidden"}></div>
    `;

    const doneWrap = card.querySelector(".mobile-done-toggle");
    doneWrap.appendChild(createCheckbox(entry.done, actualIndex));

    card.querySelector(".mobile-edit-button").addEventListener("click", () => {
      toggleMobileEdit(actualIndex);
    });
    card.querySelector(".mobile-expand-button").addEventListener("click", () => {
      toggleMobileOpen(actualIndex);
    });

    const body = card.querySelector(".mobile-card-body");
    body.appendChild(
      createMobileField(
        "Morning routine",
        "sunny-outline",
        actualIndex,
        "morning",
        entry.morning,
        isEditing
      )
    );
    body.appendChild(
      createMobileField(
        "Evening cleanse",
        "moon-outline",
        actualIndex,
        "eveningCleanse",
        entry.eveningCleanse,
        isEditing
      )
    );
    body.appendChild(
      createMobileField(
        "Afternoon/Evening skincare",
        "flask-outline",
        actualIndex,
        "skincare",
        entry.skincare,
        isEditing
      )
    );
    body.appendChild(
      createMobileField(
        "Extra care",
        "sparkles-outline",
        actualIndex,
        "extraCare",
        entry.extraCare,
        isEditing
      )
    );
    body.appendChild(
      createMobileField(
        "Notes",
        "document-text-outline",
        actualIndex,
        "notes",
        entry.notes,
        isEditing,
        true
      )
    );

    mobileCards.appendChild(card);
  });
}

function render() {
  updateWeekRangeLabel();
  renderJournalSummary();
  renderTable();
  renderMobileCards();
}

function exportRoutineJson() {
  setSettingsOpen(false);
  const payload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    routine: routineData,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `my-skin-journal-${getTodayDateKey()}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  flashStatus("JSON으로 내보냈어요.", "saved");
}

function importRoutineJson(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      const source = Array.isArray(parsed) ? parsed : parsed.routine;
      const imported = normalizeRoutineData(source);
      routineData = imported;
      visibleWeekStart = getWeekStartIndex();
      mobileOpenDay = getTodayIndex();
      mobileEditDay = null;
      saveRoutine("JSON을 가져왔어요.");
      render();
    } catch (error) {
      flashStatus("JSON 형식을 읽지 못했어요.", "reset");
    } finally {
      importFileInput.value = "";
    }
  };
  reader.readAsText(file);
}

function appendMoreDays(count = TIMELINE_APPEND_DAYS, shouldRender = true) {
  const lastDate = routineData.length
    ? routineData[routineData.length - 1].date
    : getTodayDateKey();

  for (let index = 1; index <= count; index += 1) {
    routineData.push(createEmptyEntry(addDays(lastDate, index)));
  }

  saveRoutine(`${count}일 더 추가했어요.`);
  if (shouldRender) {
    render();
  }
}

function showPreviousWeek() {
  visibleWeekStart = Math.max(0, visibleWeekStart - 7);
  mobileEditDay = null;
  render();
}

function showNextWeek() {
  if (visibleWeekStart + 7 >= routineData.length) {
    appendMoreDays(TIMELINE_APPEND_DAYS, false);
  }
  visibleWeekStart += 7;
  mobileEditDay = null;
  render();
}

document.addEventListener("click", (event) => {
  if (!isSettingsOpen) {
    return;
  }

  if (!event.target.closest(".settings-menu")) {
    setSettingsOpen(false);
  }
});

themeToggle.addEventListener("click", toggleTheme);
settingsButton.addEventListener("click", toggleSettingsMenu);
signInTab.addEventListener("click", () => setAuthMode("sign-in"));
signUpTab.addEventListener("click", () => setAuthMode("sign-up"));
authForm.addEventListener("submit", handleAuthSubmit);
logoutButton.addEventListener("click", handleLogout);
exportButton.addEventListener("click", exportRoutineJson);
importButton.addEventListener("click", () => {
  setSettingsOpen(false);
  importFileInput.click();
});
prevWeekButton.addEventListener("click", showPreviousWeek);
nextWeekButton.addEventListener("click", showNextWeek);
importFileInput.addEventListener("change", importRoutineJson);

applyTheme(currentTheme);
setAuthMode("sign-in");
supabaseClient = initSupabase();
routineData = ensureTimelineWindow(routineData);
visibleWeekStart = getWeekStartIndex();
mobileOpenDay = getTodayIndex();

if (supabaseClient) {
  syncSession();
} else {
  updateAuthUI();
  setAuthMessage("script.js에 Supabase URL과 anon key를 넣으면 로그인 기능이 활성화됩니다.");
}

render();
