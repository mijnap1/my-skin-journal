const STORAGE_KEY = "my-skin-journal-routine-v1";
const THEME_STORAGE_KEY = "my-skin-journal-theme";
const SESSION_STORAGE_KEY = "my-skin-journal-session";
const SUPABASE_URL = "https://vglbxczlwztpwdpvcmte.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_xruzoF0QoYwU5V7nHspv1g_yfICa38n";
const TIMELINE_WINDOW_DAYS = 21;
const TIMELINE_APPEND_DAYS = 7;
const KOREAN_WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const ACTIVE_VIEW_KEY = "my-skin-journal-active-view";
const ACTIVE_SKIN_SECTION_KEY = "my-skin-journal-active-skin-section";

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
const duplicateWeekButton = document.getElementById("duplicateWeekButton");
const exportButton = document.getElementById("exportButton");
const importButton = document.getElementById("importButton");
const importFileInput = document.getElementById("importFileInput");
const prevWeekButton = document.getElementById("prevWeekButton");
const nextWeekButton = document.getElementById("nextWeekButton");
const weekRangeLabel = document.getElementById("weekRangeLabel");
const journalSummary = document.getElementById("journalSummary");
const skinVideoForm = document.getElementById("skinVideoForm");
const skinVideoUrlInput = document.getElementById("skinVideoUrlInput");
const skinVideoTitleInput = document.getElementById("skinVideoTitleInput");
const skinVideoNoteInput = document.getElementById("skinVideoNoteInput");
const skinVideoPreview = document.getElementById("skinVideoPreview");
const skinVideoList = document.getElementById("skinVideoList");
const skinRoutineTab = document.getElementById("skinRoutineTab");
const skinProductsTab = document.getElementById("skinProductsTab");
const skinRoutineSection = document.getElementById("skinRoutineSection");
const skinProductsSection = document.getElementById("skinProductsSection");
const skinProductMatrix = document.getElementById("skinProductMatrix");
const skinProductForm = document.getElementById("skinProductForm");
const skinProductTarget = document.getElementById("skinProductTarget");
const skinProductNameInput = document.getElementById("skinProductNameInput");
const skinProductBrandInput = document.getElementById("skinProductBrandInput");
const skinProductCategoryInput = document.getElementById("skinProductCategoryInput");
const skinProductPriceInput = document.getElementById("skinProductPriceInput");
const skinProductLinkInput = document.getElementById("skinProductLinkInput");
const skinProductStatusInput = document.getElementById("skinProductStatusInput");
const skinProductNoteInput = document.getElementById("skinProductNoteInput");
const skinProductImageZone = document.getElementById("skinProductImageZone");
const skinProductImagePreview = document.getElementById("skinProductImagePreview");
const skinProductImageInput = document.getElementById("skinProductImageInput");
const skinViewTab = document.getElementById("skinViewTab");
const bodyViewTab = document.getElementById("bodyViewTab");
const skinView = document.getElementById("skinView");
const bodyView = document.getElementById("bodyView");
const bodyHero = document.getElementById("bodyHero");
const heightInput = document.getElementById("heightInput");
const ageInput = document.getElementById("ageInput");
const sexInput = document.getElementById("sexInput");
const sexButtons = sexInput ? Array.from(sexInput.querySelectorAll("[data-sex-value]")) : [];
const targetWeightInput = document.getElementById("targetWeightInput");
const bodyEntryForm = document.getElementById("bodyEntryForm");
const bodyWeightInput = document.getElementById("bodyWeightInput");
const bodyDateInput = document.getElementById("bodyDateInput");
const bodyDateToggle = document.getElementById("bodyDateToggle");
const bodyCalendarPanel = document.getElementById("bodyCalendarPanel");
const bodyNoteInput = document.getElementById("bodyNoteInput");
const bodyChart = document.getElementById("bodyChart");
const bodyHistory = document.getElementById("bodyHistory");
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
let bodyData = loadBodyData();
let skinLibraryData = loadSkinLibraryData();
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
let activeView = loadActiveView();
let activeSkinSection = loadActiveSkinSection();
let fallbackClipboard = "";
let contextMenuState = null;
let longPressTimer = null;
let isBodyCalendarOpen = false;
let bodyCalendarMonth = getWeekStartDateKey().slice(0, 7);
let skinVideoPreviewState = null;
let skinVideoPreviewTimer = null;
let skinProductStatus = "interested";
let skinProductImageData = "";
let skinProductTargetCell = { season: "spring", skinType: "combo" };
const SKIN_SEASONS = [
  { value: "spring", label: "봄", icon: "leaf-outline" },
  { value: "summer", label: "여름", icon: "sunny-outline" },
  { value: "fall", label: "가을", icon: "leaf-outline" },
  { value: "winter", label: "겨울", icon: "snow-outline" },
];
const SKIN_TYPES = [
  { value: "combo", label: "수부지 / 복합성" },
];
const moodOptions = [
  { value: "calm", label: "Calm", icon: "leaf-outline" },
  { value: "glowy", label: "Glowy", icon: "sparkles-outline" },
  { value: "dry", label: "Dry", icon: "water-outline" },
  { value: "sensitive", label: "Sensitive", icon: "rose-outline" },
];
const cellContextMenu = createCellContextMenu();

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

function getWeekStartDateKey(dateKey = getTodayDateKey()) {
  const date = parseDateKey(dateKey);
  const day = date.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diffToMonday);
  return formatDateKey(date);
}

function getWeekdayLabel(dateKey) {
  return KOREAN_WEEKDAYS[parseDateKey(dateKey).getDay()];
}

function formatDateLabel(dateKey) {
  const date = parseDateKey(dateKey);
  return `${date.getMonth() + 1}.${date.getDate()}`;
}

function formatCalendarDateLabel(dateKey) {
  const date = parseDateKey(dateKey);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

function formatCalendarMonthLabel(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  return `${year}.${String(month).padStart(2, "0")}`;
}

function shiftMonth(monthKey, delta) {
  const [year, month] = monthKey.split("-").map(Number);
  const date = new Date(year, month - 1 + delta, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function normalizeDecimalInput(value) {
  return String(value || "")
    .trim()
    .replace(",", ".")
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*)\./g, "$1");
}

function createSkinVideoId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function extractYouTubeVideoId(url) {
  if (typeof url !== "string" || !url.trim()) {
    return "";
  }

  try {
    const parsedUrl = new URL(url.trim());
    const host = parsedUrl.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return parsedUrl.pathname.slice(1).split("/")[0];
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v") || "";
      }

      if (parsedUrl.pathname.startsWith("/shorts/")) {
        return parsedUrl.pathname.split("/")[2] || "";
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        return parsedUrl.pathname.split("/")[2] || "";
      }
    }
  } catch (error) {
    return "";
  }

  return "";
}

function buildYouTubeWatchUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function buildYouTubeEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
}

function buildYouTubeThumbnailUrl(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function fetchYouTubeTitle(videoId) {
  if (!videoId) {
    return "";
  }

  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        buildYouTubeWatchUrl(videoId)
      )}&format=json`
    );

    if (!response.ok) {
      throw new Error(`oEmbed request failed: ${response.status}`);
    }

    const data = await response.json();
    return typeof data.title === "string" ? data.title : "";
  } catch (error) {
    console.warn("Failed to fetch YouTube title:", error);
    return "";
  }
}

function renderSkinVideoPreview() {
  if (!skinVideoPreviewState?.videoId) {
    skinVideoPreview.hidden = true;
    skinVideoPreview.innerHTML = "";
    return;
  }

  const previewTitle =
    skinVideoTitleInput.value.trim() ||
    skinVideoPreviewState.youtubeTitle ||
    "YouTube video preview";
  const previewNote = skinVideoNoteInput.value.trim();

  skinVideoPreview.hidden = false;
  skinVideoPreview.innerHTML = `
    <div class="skin-video-preview-frame">
      <iframe
        src="${buildYouTubeEmbedUrl(skinVideoPreviewState.videoId)}"
        title="${escapeHtml(previewTitle)}"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
    <div class="skin-video-preview-copy">
      <p class="summary-kicker">Preview</p>
      <h3>${escapeHtml(previewTitle)}</h3>
      ${
        skinVideoPreviewState.youtubeTitle
          ? `<p class="skin-video-source-title">${escapeHtml(
              skinVideoPreviewState.youtubeTitle
            )}</p>`
          : `<p class="skin-video-source-title is-muted">${
              skinVideoPreviewState.isLoading ? "영상 제목 불러오는 중..." : "영상 제목을 불러오지 못했어요."
            }</p>`
      }
      ${
        previewNote
          ? `<p class="skin-video-preview-note">${escapeHtml(previewNote)}</p>`
          : '<p class="skin-video-preview-note is-muted">개인 제목이나 메모를 남겨두면 나중에 찾기 쉬워져요.</p>'
      }
    </div>
  `;
}

async function syncSkinVideoPreview() {
  const videoId = extractYouTubeVideoId(skinVideoUrlInput.value);

  if (!videoId) {
    skinVideoPreviewState = null;
    renderSkinVideoPreview();
    return;
  }

  if (skinVideoPreviewState?.videoId !== videoId) {
    skinVideoPreviewState = {
      videoId,
      youtubeTitle: "",
      isLoading: true,
    };
    renderSkinVideoPreview();
  }

  const youtubeTitle = await fetchYouTubeTitle(videoId);
  if (!skinVideoPreviewState || skinVideoPreviewState.videoId !== videoId) {
    return;
  }

  skinVideoPreviewState = {
    videoId,
    youtubeTitle,
    isLoading: false,
  };
  renderSkinVideoPreview();
}

function queueSkinVideoPreviewSync() {
  window.clearTimeout(skinVideoPreviewTimer);
  skinVideoPreviewTimer = window.setTimeout(() => {
    syncSkinVideoPreview();
  }, 180);
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

function createEmptyTimeline(
  startDateKey = getWeekStartDateKey(),
  days = TIMELINE_WINDOW_DAYS
) {
  return Array.from({ length: days }, (_, index) => createEmptyEntry(addDays(startDateKey, index)));
}

function createEmptyBodyData() {
  return {
    heightCm: "",
    age: "",
    sex: "",
    targetWeightKg: "",
    entries: [],
  };
}

function createEmptySkinLibraryData() {
  return {
    videos: [],
    products: [],
  };
}

function normalizeBodyData(data) {
  if (!data || typeof data !== "object") {
    return createEmptyBodyData();
  }

  const entries = Array.isArray(data.entries)
    ? data.entries
        .filter((entry) => entry && typeof entry.date === "string")
        .map((entry) => ({
          date: entry.date,
          weightKg:
            typeof entry.weightKg === "string" || typeof entry.weightKg === "number"
              ? String(entry.weightKg)
              : "",
          note: typeof entry.note === "string" ? entry.note : "",
        }))
        .sort((a, b) => b.date.localeCompare(a.date))
    : [];

  return {
    heightCm:
      typeof data.heightCm === "string" || typeof data.heightCm === "number"
        ? String(data.heightCm)
        : "",
    age:
      typeof data.age === "string" || typeof data.age === "number"
        ? String(data.age)
        : "",
    sex: data.sex === "female" || data.sex === "male" ? data.sex : "",
    targetWeightKg:
      typeof data.targetWeightKg === "string" || typeof data.targetWeightKg === "number"
        ? String(data.targetWeightKg)
        : "",
    entries,
  };
}

function normalizeSkinLibraryData(data) {
  if (!data || typeof data !== "object") {
    return createEmptySkinLibraryData();
  }

  const videos = Array.isArray(data.videos)
    ? data.videos
        .filter((entry) => entry && typeof entry.videoId === "string")
        .map((entry) => ({
          id:
            typeof entry.id === "string" && entry.id.trim()
              ? entry.id
              : `${entry.videoId}-${entry.addedAt || Date.now()}`,
          url: typeof entry.url === "string" ? entry.url : "",
          videoId: entry.videoId,
          customTitle: typeof entry.customTitle === "string" ? entry.customTitle : "",
          note: typeof entry.note === "string" ? entry.note : "",
          youtubeTitle: typeof entry.youtubeTitle === "string" ? entry.youtubeTitle : "",
          thumbnailUrl: typeof entry.thumbnailUrl === "string" ? entry.thumbnailUrl : "",
          addedAt: typeof entry.addedAt === "string" ? entry.addedAt : new Date().toISOString(),
        }))
        .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    : [];

  return {
    videos,
    products: Array.isArray(data.products)
      ? data.products
          .filter((entry) => entry && typeof entry.id === "string")
          .map((entry) => ({
            id: entry.id,
            name: typeof entry.name === "string" ? entry.name : "",
            brand: typeof entry.brand === "string" ? entry.brand : "",
            category: typeof entry.category === "string" ? entry.category : "",
            price: typeof entry.price === "string" || typeof entry.price === "number" ? String(entry.price) : "",
            link: typeof entry.link === "string" ? entry.link : "",
            season: SKIN_SEASONS.some((item) => item.value === entry.season) ? entry.season : "spring",
            skinType: SKIN_TYPES.some((item) => item.value === entry.skinType) ? entry.skinType : "combo",
            status:
              entry.status === "interested" ||
              entry.status === "buy-next" ||
              entry.status === "bought" ||
              entry.status === "testing"
                ? entry.status
                : "interested",
            note: typeof entry.note === "string" ? entry.note : "",
            imageDataUrl: typeof entry.imageDataUrl === "string" ? entry.imageDataUrl : "",
            addedAt: typeof entry.addedAt === "string" ? entry.addedAt : new Date().toISOString(),
          }))
          .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
      : [],
  };
}

function normalizeAppData(data) {
  if (data && typeof data === "object" && !Array.isArray(data) && data.skinTimeline) {
    return {
      skinTimeline: normalizeRoutineData(data.skinTimeline),
      bodyProgress: normalizeBodyData(data.bodyProgress),
      skinLibrary: normalizeSkinLibraryData(data.skinLibrary),
    };
  }

  return {
    skinTimeline: normalizeRoutineData(data),
    bodyProgress: createEmptyBodyData(),
    skinLibrary: createEmptySkinLibraryData(),
  };
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

function hasMeaningfulSkinLibrary(data) {
  return (
    (Array.isArray(data?.videos) && data.videos.length > 0) ||
    (Array.isArray(data?.products) && data.products.length > 0)
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
  const baseDate = getWeekStartDateKey();
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
  const mondayStart = getWeekStartDateKey(sorted[0].date);
  const timeline = [];
  const firstDate = mondayStart < sorted[0].date ? mondayStart : sorted[0].date;
  const targetLength = Math.max(TIMELINE_WINDOW_DAYS, sorted.length);
  const entryMap = new Map(sorted.map((entry) => [entry.date, entry]));

  for (let index = 0; index < targetLength; index += 1) {
    const dateKey = addDays(firstDate, index);
    timeline.push(entryMap.get(dateKey) || createEmptyEntry(dateKey));
  }

  const todayKey = getTodayDateKey();
  const currentWeekStart = getWeekStartDateKey(todayKey);

  while (timeline[0].date > currentWeekStart) {
    timeline.unshift(createEmptyEntry(addDays(timeline[0].date, -1)));
  }

  while (timeline[timeline.length - 1].date < todayKey) {
    timeline.push(createEmptyEntry(addDays(timeline[timeline.length - 1].date, 1)));
  }

  while (timeline[timeline.length - 1].date < addDays(currentWeekStart, 6)) {
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
    const normalized = normalizeAppData(parsed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized.skinTimeline;
  } catch (error) {
    console.warn("Failed to read saved routine:", error);
    return createEmptyTimeline();
  }
}

function loadBodyData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return createEmptyBodyData();
    }

    const parsed = JSON.parse(saved);
    return normalizeAppData(parsed).bodyProgress;
  } catch (error) {
    console.warn("Failed to read body progress:", error);
    return createEmptyBodyData();
  }
}

function loadSkinLibraryData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return createEmptySkinLibraryData();
    }

    const parsed = JSON.parse(saved);
    return normalizeAppData(parsed).skinLibrary;
  } catch (error) {
    console.warn("Failed to read skin library:", error);
    return createEmptySkinLibraryData();
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  return "dark";
}

function loadActiveView() {
  const saved = localStorage.getItem(ACTIVE_VIEW_KEY);
  return saved === "body" ? "body" : "skin";
}

function loadActiveSkinSection() {
  const saved = localStorage.getItem(ACTIVE_SKIN_SECTION_KEY);
  return saved === "products" ? "products" : "routine";
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

function buildAppPayload() {
  return {
    version: 4,
    skinTimeline: routineData,
    bodyProgress: bodyData,
    skinLibrary: skinLibraryData,
  };
}

function setSettingsOpen(nextState) {
  isSettingsOpen = nextState;
  settingsPanel.hidden = !nextState;
  settingsButton.setAttribute("aria-expanded", String(nextState));
}

function toggleSettingsMenu() {
  setSettingsOpen(!isSettingsOpen);
}

function setBodyCalendarDate(dateKey) {
  const resolvedDate = dateKey || getTodayDateKey();
  bodyDateInput.dataset.value = resolvedDate;
  bodyDateInput.value = formatCalendarDateLabel(resolvedDate);
  bodyCalendarMonth = resolvedDate.slice(0, 7);
}

function setBodyCalendarOpen(nextState) {
  isBodyCalendarOpen = nextState;
  bodyCalendarPanel.hidden = !nextState;
  bodyDateToggle.setAttribute("aria-expanded", String(nextState));
  if (nextState) {
    renderBodyCalendar();
  }
}

function renderBodyCalendar() {
  const selectedDate = bodyDateInput.dataset.value || getTodayDateKey();
  const [year, month] = bodyCalendarMonth.split("-").map(Number);
  const firstOfMonth = new Date(year, month - 1, 1);
  const startDay = firstOfMonth.getDay();
  const mondayOffset = startDay === 0 ? 6 : startDay - 1;
  const gridStart = new Date(year, month - 1, 1 - mondayOffset);
  const todayKey = getTodayDateKey();

  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    const dateKey = formatDateKey(date);
    const isCurrentMonth = date.getMonth() === month - 1;
    return { dateKey, day: date.getDate(), isCurrentMonth };
  });

  bodyCalendarPanel.innerHTML = `
    <div class="body-calendar-head">
      <button class="body-calendar-nav" type="button" data-calendar-nav="-1" aria-label="Previous month">
        <ion-icon name="chevron-back-outline" aria-hidden="true"></ion-icon>
      </button>
      <strong>${formatCalendarMonthLabel(bodyCalendarMonth)}</strong>
      <button class="body-calendar-nav" type="button" data-calendar-nav="1" aria-label="Next month">
        <ion-icon name="chevron-forward-outline" aria-hidden="true"></ion-icon>
      </button>
    </div>
    <div class="body-calendar-weekdays">
      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
    </div>
    <div class="body-calendar-grid">
      ${days
        .map(
          ({ dateKey, day, isCurrentMonth }) => `
            <button
              class="body-calendar-day${isCurrentMonth ? "" : " is-outside"}${
                dateKey === selectedDate ? " is-selected" : ""
              }${dateKey === todayKey ? " is-today" : ""}"
              type="button"
              data-date-key="${dateKey}"
            >
              ${day}
            </button>
          `
        )
        .join("")}
    </div>
  `;

  bodyCalendarPanel.querySelectorAll("[data-calendar-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      bodyCalendarMonth = shiftMonth(bodyCalendarMonth, Number(button.dataset.calendarNav));
      renderBodyCalendar();
    });
  });

  bodyCalendarPanel.querySelectorAll("[data-date-key]").forEach((button) => {
    button.addEventListener("click", () => {
      setBodyCalendarDate(button.dataset.dateKey);
      setBodyCalendarOpen(false);
    });
  });
}

function createCellContextMenu() {
  const menu = document.createElement("div");
  menu.className = "cell-context-menu";
  menu.hidden = true;
  menu.innerHTML = `
    <button class="context-menu-item" type="button" data-action="copy">
      <ion-icon name="copy-outline" aria-hidden="true"></ion-icon>
      <span>Copy</span>
    </button>
    <button class="context-menu-item" type="button" data-action="paste">
      <ion-icon name="clipboard-outline" aria-hidden="true"></ion-icon>
      <span>Paste</span>
    </button>
    <button class="context-menu-item" type="button" data-action="clear">
      <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
      <span>Clear</span>
    </button>
  `;

  menu.addEventListener("click", async (event) => {
    const button = event.target.closest(".context-menu-item");
    if (!button || !contextMenuState) {
      return;
    }

    const action = button.dataset.action;
    if (action === "copy") {
      await copyFieldValue(contextMenuState);
    } else if (action === "paste") {
      await pasteFieldValue(contextMenuState);
    } else if (action === "clear") {
      clearFieldValue(contextMenuState);
    }
    closeCellContextMenu();
  });

  document.body.appendChild(menu);
  return menu;
}

function getFieldTargetMeta(target) {
  const editableTarget = target.closest("[data-index][data-field]");
  if (!editableTarget) {
    return null;
  }

  return {
    element: editableTarget,
    index: Number(editableTarget.dataset.index),
    field: editableTarget.dataset.field,
    isTextarea: editableTarget.matches("textarea"),
  };
}

function openCellContextMenu(event, meta) {
  event.preventDefault();
  contextMenuState = meta;
  cellContextMenu.hidden = false;
  cellContextMenu.style.left = `${Math.min(event.clientX, window.innerWidth - 188)}px`;
  cellContextMenu.style.top = `${Math.min(event.clientY, window.innerHeight - 148)}px`;
}

function closeCellContextMenu() {
  contextMenuState = null;
  cellContextMenu.hidden = true;
}

async function writeClipboardText(text) {
  fallbackClipboard = text;
  if (!navigator.clipboard?.writeText) {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.warn("Clipboard write failed, using fallback clipboard.", error);
  }
}

async function readClipboardText() {
  if (navigator.clipboard?.readText) {
    try {
      const text = await navigator.clipboard.readText();
      if (typeof text === "string") {
        fallbackClipboard = text;
        return text;
      }
    } catch (error) {
      console.warn("Clipboard read failed, using fallback clipboard.", error);
    }
  }

  return fallbackClipboard;
}

async function copyFieldValue(meta) {
  const text = meta.isTextarea
    ? meta.element.value
    : routineData[meta.index]?.[meta.field] || "";
  await writeClipboardText(text);
}

async function pasteFieldValue(meta) {
  const text = await readClipboardText();
  if (typeof text !== "string") {
    return;
  }

  if (meta.isTextarea) {
    meta.element.value = text;
    routineData[meta.index][meta.field] = text.trim();
    saveRoutine("붙여넣기 완료");
    meta.element.focus();
    return;
  }

  routineData[meta.index][meta.field] = text.trim();
  saveRoutine("붙여넣기 완료");
  render();
}

function clearFieldValue(meta) {
  if (meta.isTextarea) {
    meta.element.value = "";
    routineData[meta.index][meta.field] = "";
    saveRoutine("칸 내용을 비웠어요.");
    meta.element.focus();
    return;
  }

  routineData[meta.index][meta.field] = "";
  saveRoutine("칸 내용을 비웠어요.");
  render();
}

function attachContextMenu(element) {
  element.addEventListener("contextmenu", (event) => {
    const meta = getFieldTargetMeta(event.target);
    if (!meta) {
      return;
    }
    openCellContextMenu(event, meta);
  });

  element.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    longPressTimer = window.setTimeout(() => {
      const meta = getFieldTargetMeta(event.target);
      if (!meta) {
        return;
      }
      openCellContextMenu(
        {
          preventDefault() {},
          clientX: touch.clientX,
          clientY: touch.clientY,
        },
        meta
      );
    }, 420);
  });

  const cancelLongPress = () => {
    window.clearTimeout(longPressTimer);
  };

  element.addEventListener("touchend", cancelLongPress);
  element.addEventListener("touchmove", cancelLongPress);
  element.addEventListener("touchcancel", cancelLongPress);
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(buildAppPayload()));
  queueRemoteSave();
  flashStatus(message, stateClass);
}

function saveBodyProgress(message = "바디 기록 저장됨", stateClass = "saved") {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(buildAppPayload()));
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

  const remoteAppData = normalizeAppData(data);

  if (
    !hasMeaningfulRoutine(remoteAppData.skinTimeline) &&
    !remoteAppData.bodyProgress.entries.length &&
    !hasMeaningfulSkinLibrary(remoteAppData.skinLibrary) &&
    (hasMeaningfulRoutine(routineData) ||
      bodyData.entries.length > 0 ||
      hasMeaningfulSkinLibrary(skinLibraryData))
  ) {
    saveRoutine("현재 기기 루틴을 계정에 저장했어요.");
    return;
  }

  routineData = remoteAppData.skinTimeline;
  bodyData = remoteAppData.bodyProgress;
  skinLibraryData = remoteAppData.skinLibrary;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(buildAppPayload()));
}

async function saveRoutineRemote() {
  if (!supabaseClient || !currentSessionToken) {
    return;
  }

  const { error } = await supabaseClient.rpc("skin_journal_save_routine", {
    p_token: currentSessionToken,
    p_routine: buildAppPayload(),
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
    bodyData = createEmptyBodyData();
    skinLibraryData = createEmptySkinLibraryData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(buildAppPayload()));
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
  bodyData = loadBodyData();
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
  const targetDate = routineData[index]?.date || getTodayDateKey();
  const mondayKey = getWeekStartDateKey(targetDate);
  const foundIndex = routineData.findIndex((entry) => entry.date === mondayKey);
  return foundIndex >= 0 ? foundIndex : Math.max(0, index);
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

function renderSkinVideoList() {
  if (!skinLibraryData.videos.length) {
    skinVideoList.innerHTML = `
      <article class="skin-video-empty">
        <ion-icon name="logo-youtube" aria-hidden="true"></ion-icon>
        <div>
          <strong>아직 저장한 스킨케어 영상이 없어요.</strong>
          <p>링크를 넣고 개인 제목이나 메모를 붙여두면, 나중에 루틴 참고용으로 다시 보기 쉬워집니다.</p>
        </div>
      </article>
    `;
    return;
  }

  skinVideoList.innerHTML = skinLibraryData.videos
    .map(
      (video) => `
        <article class="skin-video-card card">
          <div class="skin-video-card-frame">
            <iframe
              src="${buildYouTubeEmbedUrl(video.videoId)}"
              title="${escapeHtml(
                video.customTitle || video.youtubeTitle || "Saved skincare video"
              )}"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
          <div class="skin-video-card-copy">
            <div class="skin-video-card-head">
              <div>
                <p class="summary-kicker">Saved video</p>
                <h3>${escapeHtml(
                  video.customTitle || video.youtubeTitle || "Untitled reference"
                )}</h3>
                ${
                  video.youtubeTitle && video.customTitle
                    ? `<p class="skin-video-source-title">${escapeHtml(
                        video.youtubeTitle
                      )}</p>`
                    : ""
                }
              </div>
              <div class="skin-video-card-actions">
                <a
                  class="button button-secondary skin-video-link-button"
                  href="${video.url || buildYouTubeWatchUrl(video.videoId)}"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                  <span>Open</span>
                </a>
                <button
                  class="button button-secondary skin-video-delete-button"
                  type="button"
                  data-video-id="${video.id}"
                >
                  <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
                  <span>Delete</span>
                </button>
              </div>
            </div>
            ${
              video.note
                ? `<p class="skin-video-note">${escapeHtml(video.note)}</p>`
                : '<p class="skin-video-note is-muted">메모 없음</p>'
            }
          </div>
        </article>
      `
    )
    .join("");

  skinVideoList.querySelectorAll("[data-video-id]").forEach((button) => {
    button.addEventListener("click", () => {
      skinLibraryData.videos = skinLibraryData.videos.filter(
        (video) => video.id !== button.dataset.videoId
      );
      saveRoutine("저장한 영상을 삭제했어요.");
      renderSkinVideoList();
    });
  });
}

function getProductStatusLabel(status) {
  const labels = {
    interested: "Interested",
    "buy-next": "Buy next",
    bought: "Bought",
    testing: "Testing",
  };
  return labels[status] || "Interested";
}

function getSeasonLabel(season) {
  return SKIN_SEASONS.find((item) => item.value === season)?.label || "봄";
}

function getSkinTypeLabel(skinType) {
  return SKIN_TYPES.find((item) => item.value === skinType)?.label || "수부지 / 복합성";
}

function setSkinProductStatus(status) {
  skinProductStatus =
    status === "buy-next" || status === "bought" || status === "testing" ? status : "interested";

  if (!skinProductStatusInput) {
    return;
  }

  skinProductStatusInput.querySelectorAll("[data-product-status]").forEach((button) => {
    const isActive = button.dataset.productStatus === skinProductStatus;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderSkinProductImagePreview() {
  if (!skinProductImageData) {
    skinProductImagePreview.hidden = true;
    skinProductImagePreview.innerHTML = "";
    return;
  }

  skinProductImagePreview.hidden = false;
  skinProductImagePreview.innerHTML = `
    <img src="${skinProductImageData}" alt="Selected product preview" />
    <button id="skinProductImageClearButton" class="skin-product-image-clear" type="button">
      <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
      <span>Remove</span>
    </button>
  `;

  document.getElementById("skinProductImageClearButton").addEventListener("click", () => {
    skinProductImageData = "";
    renderSkinProductImagePreview();
  });
}

function setSkinProductTargetCell(season, skinType) {
  skinProductTargetCell = {
    season: SKIN_SEASONS.some((item) => item.value === season) ? season : "spring",
    skinType: SKIN_TYPES.some((item) => item.value === skinType) ? skinType : "combo",
  };

  skinProductTarget.textContent = `${getSkinTypeLabel(skinProductTargetCell.skinType)} · ${getSeasonLabel(
    skinProductTargetCell.season
  )}`;
}

function renderSkinProductList() {
  const seasonHeaders = SKIN_SEASONS.map(
    (season) => `
      <div class="skin-season-header">
        <span>${season.label}</span>
        <ion-icon name="${season.icon}" aria-hidden="true"></ion-icon>
      </div>
    `
  ).join("");

  const rows = SKIN_TYPES.map((skinType) => {
    const cells = SKIN_SEASONS.map((season) => {
      const products = skinLibraryData.products.filter(
        (product) => product.season === season.value && product.skinType === skinType.value
      );

      return `
        <div class="skin-season-cell${
          skinProductTargetCell.season === season.value &&
          skinProductTargetCell.skinType === skinType.value
            ? " is-active"
            : ""
        }" data-season="${season.value}" data-skin-type="${skinType.value}">
          <button class="skin-season-cell-add" type="button" data-season="${season.value}" data-skin-type="${skinType.value}">
            <ion-icon name="add-outline" aria-hidden="true"></ion-icon>
            <span>Add</span>
          </button>
          <div class="skin-season-cell-list">
            ${
              products.length
                ? products
                    .map(
                      (product) => `
                        <article class="skin-season-product-card">
                          ${
                            product.imageDataUrl
                              ? `<img class="skin-season-product-image" src="${product.imageDataUrl}" alt="${escapeHtml(
                                  product.name
                                )}" />`
                              : ""
                          }
                          <div class="skin-season-product-copy">
                            <p class="summary-kicker">${escapeHtml(
                              getProductStatusLabel(product.status)
                            )}</p>
                            <h3>${escapeHtml(product.name || "Untitled product")}</h3>
                            <p class="skin-product-meta">
                              ${[product.brand, product.category, product.price ? `${product.price}` : ""]
                                .filter(Boolean)
                                .map((value) => escapeHtml(value))
                                .join(" · ") || "No extra details"}
                            </p>
                            ${
                              product.note
                                ? `<p class="skin-product-note">${escapeHtml(product.note)}</p>`
                                : ""
                            }
                          </div>
                          <div class="skin-product-card-actions">
                            ${
                              product.link
                                ? `
                                  <a
                                    class="button button-secondary skin-product-link-button"
                                    href="${escapeHtml(product.link)}"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                  >
                                    <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                                    <span>Open</span>
                                  </a>
                                `
                                : ""
                            }
                            <button
                              class="button button-secondary skin-product-delete-button"
                              type="button"
                              data-product-id="${product.id}"
                            >
                              <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
                              <span>Delete</span>
                            </button>
                          </div>
                        </article>
                      `
                    )
                    .join("")
                : '<p class="skin-season-empty">No products yet</p>'
            }
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="skin-season-row-label">${skinType.label}</div>
      ${cells}
    `;
  }).join("");

  skinProductMatrix.innerHTML = `
    <div class="skin-season-corner">피부타입 / 계절</div>
    ${seasonHeaders}
    ${rows}
  `;

  skinProductMatrix.querySelectorAll(".skin-season-cell").forEach((element) => {
    element.addEventListener("click", (event) => {
      const season = event.currentTarget.dataset.season;
      const skinType = event.currentTarget.dataset.skinType;
      setSkinProductTargetCell(season, skinType);
      renderSkinProductList();
    });
  });

  skinProductMatrix.querySelectorAll(".skin-season-cell-add").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      setSkinProductTargetCell(button.dataset.season, button.dataset.skinType);
      renderSkinProductList();
    });
  });

  skinProductMatrix.querySelectorAll("[data-product-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      skinLibraryData.products = skinLibraryData.products.filter(
        (product) => product.id !== button.dataset.productId
      );
      saveRoutine("저장한 제품을 삭제했어요.");
      renderSkinProductList();
    });
  });

  renderSkinProductImagePreview();
}

function handleSkinProductSubmit(event) {
  event.preventDefault();

  const name = skinProductNameInput.value.trim();
  if (!name) {
    skinProductNameInput.reportValidity();
    return;
  }

  const nextProduct = {
    id: createSkinVideoId(),
    name,
    brand: skinProductBrandInput.value.trim(),
    category: skinProductCategoryInput.value.trim(),
    price: normalizeDecimalInput(skinProductPriceInput.value),
    link: skinProductLinkInput.value.trim(),
    season: skinProductTargetCell.season,
    skinType: skinProductTargetCell.skinType,
    status: skinProductStatus,
    note: skinProductNoteInput.value.trim(),
    imageDataUrl: skinProductImageData,
    addedAt: new Date().toISOString(),
  };

  skinLibraryData.products.unshift(nextProduct);
  saveRoutine("스킨케어 제품을 저장했어요.");
  skinProductForm.reset();
  setSkinProductStatus("interested");
  skinProductImageData = "";
  renderSkinProductList();
}

function loadSkinProductImageFromFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    skinProductImageData = typeof reader.result === "string" ? reader.result : "";
    renderSkinProductImagePreview();
  };
  reader.readAsDataURL(file);
}

function handleSkinProductImagePaste(event) {
  const items = Array.from(event.clipboardData?.items || []);
  const imageItem = items.find((item) => item.type.startsWith("image/"));
  if (!imageItem) {
    return;
  }

  event.preventDefault();
  loadSkinProductImageFromFile(imageItem.getAsFile());
}

async function handleSkinVideoSubmit(event) {
  event.preventDefault();

  const rawUrl = skinVideoUrlInput.value.trim();
  const videoId = extractYouTubeVideoId(rawUrl);
  const customTitle = skinVideoTitleInput.value.trim();
  const note = skinVideoNoteInput.value.trim();

  if (!videoId) {
    skinVideoUrlInput.setCustomValidity("유효한 YouTube 링크를 넣어주세요.");
    skinVideoUrlInput.reportValidity();
    skinVideoUrlInput.setCustomValidity("");
    return;
  }

  const youtubeTitle =
    skinVideoPreviewState?.videoId === videoId ? skinVideoPreviewState.youtubeTitle : "";

  const nextVideo = {
    id: createSkinVideoId(),
    url: buildYouTubeWatchUrl(videoId),
    videoId,
    customTitle,
    note,
    youtubeTitle: youtubeTitle || (await fetchYouTubeTitle(videoId)),
    thumbnailUrl: buildYouTubeThumbnailUrl(videoId),
    addedAt: new Date().toISOString(),
  };

  skinLibraryData.videos.unshift(nextVideo);
  saveRoutine("스킨케어 참고 영상을 저장했어요.");
  skinVideoForm.reset();
  skinVideoPreviewState = null;
  renderSkinVideoPreview();
  renderSkinVideoList();
}

function createTextarea(value, index, field, extraClass = "") {
  const textarea = document.createElement("textarea");
  textarea.className = extraClass;
  textarea.value = value;
  textarea.setAttribute("data-index", index);
  textarea.setAttribute("data-field", field);
  attachContextMenu(textarea);
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
  attachContextMenu(display);
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
  renderActiveView();
  if (activeView === "skin" && activeSkinSection === "routine") {
    updateWeekRangeLabel();
    renderJournalSummary();
    renderSkinVideoPreview();
    renderSkinVideoList();
    renderTable();
    renderMobileCards();
  }
  if (activeView === "skin" && activeSkinSection === "products") {
    renderSkinProductList();
  }
  renderBodyProgress();
}

function exportRoutineJson() {
  setSettingsOpen(false);
  const payload = {
    version: 4,
    exportedAt: new Date().toISOString(),
    ...buildAppPayload(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `my-self-care-${getTodayDateKey()}.json`;
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
      const imported = normalizeAppData(parsed.routine || parsed);
      routineData = imported.skinTimeline;
      bodyData = imported.bodyProgress;
      skinLibraryData = imported.skinLibrary;
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
  const currentStartDate = routineData[visibleWeekStart]?.date || getWeekStartDateKey();
  const previousMonday = addDays(currentStartDate, -7);
  const foundIndex = routineData.findIndex((entry) => entry.date === previousMonday);
  visibleWeekStart = foundIndex >= 0 ? foundIndex : 0;
  mobileEditDay = null;
  render();
}

function showNextWeek() {
  const currentStartDate = routineData[visibleWeekStart]?.date || getWeekStartDateKey();
  const nextMonday = addDays(currentStartDate, 7);

  while (routineData[routineData.length - 1].date < addDays(nextMonday, 6)) {
    appendMoreDays(TIMELINE_APPEND_DAYS, false);
  }

  const foundIndex = routineData.findIndex((entry) => entry.date === nextMonday);
  visibleWeekStart = foundIndex >= 0 ? foundIndex : visibleWeekStart;
  mobileEditDay = null;
  render();
}

function duplicateCurrentWeekToNextWeek() {
  const currentEntries = getVisibleEntries();
  if (!currentEntries.length) {
    return;
  }

  const nextWeekStartDate = addDays(currentEntries[0].entry.date, 7);

  while (routineData[routineData.length - 1].date < addDays(nextWeekStartDate, 6)) {
    appendMoreDays(TIMELINE_APPEND_DAYS, false);
  }

  currentEntries.forEach(({ entry }, offset) => {
    const targetDate = addDays(nextWeekStartDate, offset);
    const targetIndex = routineData.findIndex((item) => item.date === targetDate);
    if (targetIndex < 0) {
      return;
    }

    routineData[targetIndex] = {
      ...routineData[targetIndex],
      morning: entry.morning,
      eveningCleanse: entry.eveningCleanse,
      skincare: entry.skincare,
      extraCare: entry.extraCare,
      done: false,
      mood: "",
      notes: "",
    };
  });

  setSettingsOpen(false);
  saveRoutine("이번 주 루틴을 다음 주로 복사했어요.");
  visibleWeekStart = routineData.findIndex((entry) => entry.date === nextWeekStartDate);
  mobileOpenDay = visibleWeekStart;
  mobileEditDay = null;
  render();
}

function setActiveSkinSection(section) {
  activeSkinSection = section === "products" ? "products" : "routine";
  localStorage.setItem(ACTIVE_SKIN_SECTION_KEY, activeSkinSection);
  renderActiveView();
}

function setActiveView(view) {
  activeView = view === "body" ? "body" : "skin";
  localStorage.setItem(ACTIVE_VIEW_KEY, activeView);
  renderActiveView();
}

function renderActiveView() {
  const isSkin = activeView === "skin";
  const isRoutine = activeSkinSection === "routine";
  skinView.hidden = !isSkin;
  bodyView.hidden = isSkin;
  skinViewTab.classList.toggle("is-active", isSkin);
  bodyViewTab.classList.toggle("is-active", !isSkin);
  skinViewTab.setAttribute("aria-pressed", String(isSkin));
  bodyViewTab.setAttribute("aria-pressed", String(!isSkin));
  skinRoutineTab.hidden = !isSkin;
  skinProductsTab.hidden = !isSkin;
  skinRoutineSection.hidden = !isSkin || !isRoutine;
  skinProductsSection.hidden = !isSkin || isRoutine;
  skinRoutineTab.classList.toggle("is-active", isRoutine);
  skinProductsTab.classList.toggle("is-active", !isRoutine);
  skinRoutineTab.setAttribute("aria-pressed", String(isRoutine));
  skinProductsTab.setAttribute("aria-pressed", String(!isRoutine));
}

function getLatestBodyEntry() {
  return bodyData.entries[0] || null;
}

function getBodyChange() {
  if (bodyData.entries.length < 2) {
    return "";
  }

  const latest = Number(bodyData.entries[0].weightKg);
  const previous = Number(bodyData.entries[1].weightKg);
  if (Number.isNaN(latest) || Number.isNaN(previous)) {
    return "";
  }

  const diff = latest - previous;
  return `${diff > 0 ? "+" : ""}${diff.toFixed(1)} kg`;
}

function getBodyBmi() {
  const latestEntry = getLatestBodyEntry();
  const heightCm = Number(bodyData.heightCm);
  const weightKg = Number(latestEntry?.weightKg);

  if (!latestEntry || Number.isNaN(heightCm) || Number.isNaN(weightKg) || heightCm <= 0) {
    return "";
  }

  const heightM = heightCm / 100;
  return (weightKg / (heightM * heightM)).toFixed(1);
}

function getSexLabel(value) {
  if (value === "female") {
    return "Female";
  }
  if (value === "male") {
    return "Male";
  }
  return "—";
}

function setSexValue(value) {
  bodyData.sex = value === "female" || value === "male" ? value : "";
  sexButtons.forEach((button) => {
    const isActive = button.dataset.sexValue === bodyData.sex;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderBodyHero() {
  const latestEntry = getLatestBodyEntry();
  const currentWeight = latestEntry?.weightKg ? `${latestEntry.weightKg} kg` : "—";
  const heightValue = bodyData.heightCm ? `${bodyData.heightCm} cm` : "—";
  const goalValue = bodyData.targetWeightKg ? `${bodyData.targetWeightKg} kg` : "—";
  const changeValue = getBodyChange() || "—";
  const bmiValue = getBodyBmi() || "—";

  bodyHero.innerHTML = `
    <div class="body-card-head">
      <p class="section-kicker">
        <ion-icon name="barbell-outline" aria-hidden="true"></ion-icon>
        <span>Body Progress</span>
      </p>
      <h2>Weight journal</h2>
    </div>
    <p class="body-hero-note">키는 프로필 값으로 두고, 몸무게는 날짜별 로그로 쌓아두는 방식이에요.</p>
    <div class="body-hero-grid">
      <div class="body-hero-stat is-primary">
        <span class="summary-stat-label">Current</span>
        <strong>${currentWeight}</strong>
      </div>
      <div class="body-hero-stat">
        <span class="summary-stat-label">Height</span>
        <strong>${heightValue}</strong>
      </div>
      <div class="body-hero-stat">
        <span class="summary-stat-label">Goal</span>
        <strong>${goalValue}</strong>
      </div>
      <div class="body-hero-stat">
        <span class="summary-stat-label">BMI</span>
        <strong>${bmiValue}</strong>
      </div>
      <div class="body-hero-stat">
        <span class="summary-stat-label">Change</span>
        <strong>${changeValue}</strong>
      </div>
    </div>
  `;
}

function renderBodyChart() {
  if (!bodyData.entries.length) {
    bodyChart.innerHTML = '<p class="body-chart-empty">아직 몸무게 기록이 없어요. 오늘 체크인부터 하나 추가해보세요.</p>';
    return;
  }

  const entries = [...bodyData.entries]
    .slice(0, 8)
    .reverse()
    .map((entry) => ({ ...entry, numericWeight: Number(entry.weightKg) }))
    .filter((entry) => !Number.isNaN(entry.numericWeight));

  if (!entries.length) {
    bodyChart.innerHTML = '<p class="body-chart-empty">숫자형 기록이 있어야 차트를 그릴 수 있어요.</p>';
    return;
  }

  const values = entries.map((entry) => entry.numericWeight);
  const targetWeight = Number(bodyData.targetWeightKg);
  const hasTargetWeight = !Number.isNaN(targetWeight);
  const min = Math.min(...values, hasTargetWeight ? targetWeight : Infinity) - 0.5;
  const max = Math.max(...values, hasTargetWeight ? targetWeight : -Infinity) + 0.5;
  const width = 620;
  const height = 220;
  const paddingX = 24;
  const paddingY = 24;

  const points = entries.map((entry, index) => {
    const x = paddingX + (index * (width - paddingX * 2)) / Math.max(entries.length - 1, 1);
    const y =
      height -
      paddingY -
      ((entry.numericWeight - min) / Math.max(max - min, 0.1)) * (height - paddingY * 2);
    return { ...entry, x, y };
  });

  const targetLineY = hasTargetWeight
    ? height -
      paddingY -
      ((targetWeight - min) / Math.max(max - min, 0.1)) * (height - paddingY * 2)
    : null;

  bodyChart.innerHTML = `
    <svg class="body-chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Weight trend chart">
      ${
        hasTargetWeight
          ? `
            <line
              class="body-chart-target-line"
              x1="${paddingX}"
              y1="${targetLineY}"
              x2="${width - paddingX}"
              y2="${targetLineY}"
            ></line>
            <text
              class="body-chart-target-label"
              x="${width - paddingX}"
              y="${targetLineY - 8}"
              text-anchor="end"
            >Goal ${targetWeight.toFixed(1)} kg</text>
          `
          : ""
      }
      <polyline class="body-chart-line" points="${points.map((point) => `${point.x},${point.y}`).join(" ")}"></polyline>
      ${points
        .map(
          (point) => `
            <circle class="body-chart-point" cx="${point.x}" cy="${point.y}" r="4"></circle>
            <text class="body-chart-value" x="${point.x}" y="${point.y - 10}" text-anchor="middle">${point.numericWeight.toFixed(1)}</text>
            <text class="body-chart-label" x="${point.x}" y="${height - 4}" text-anchor="middle">${formatDateLabel(point.date)}</text>
          `
        )
        .join("")}
    </svg>
  `;
}

function renderBodyHistory() {
  if (!bodyData.entries.length) {
    bodyHistory.innerHTML = '<p class="body-history-empty">아직 체크인 로그가 없어요.</p>';
    return;
  }

  bodyHistory.innerHTML = bodyData.entries
    .map(
      (entry, index) => `
        <article class="body-history-item">
          <div>
            <div class="body-history-date">${entry.date}</div>
            <div class="body-history-weight">${entry.weightKg} kg</div>
            ${entry.note ? `<p class="body-history-note">${entry.note}</p>` : ""}
          </div>
          <span class="summary-stat-label">${getWeekdayLabel(entry.date)}요일</span>
          <button class="body-history-delete" type="button" data-entry-index="${index}">Delete</button>
        </article>
      `
    )
    .join("");

  bodyHistory.querySelectorAll("[data-entry-index]").forEach((button) => {
    button.addEventListener("click", () => {
      bodyData.entries.splice(Number(button.dataset.entryIndex), 1);
      saveBodyProgress("체크인 기록을 삭제했어요.");
      renderBodyProgress();
    });
  });
}

function renderBodyProgress() {
  heightInput.value = bodyData.heightCm;
  ageInput.value = bodyData.age;
  setSexValue(bodyData.sex);
  targetWeightInput.value = bodyData.targetWeightKg;
  renderBodyHero();
  renderBodyChart();
  renderBodyHistory();
}

function handleBodyProfileInput() {
  bodyData.heightCm = normalizeDecimalInput(heightInput.value);
  bodyData.age = String(ageInput.value || "")
    .trim()
    .replace(/\D/g, "");
  setSexValue(bodyData.sex);
  bodyData.targetWeightKg = normalizeDecimalInput(targetWeightInput.value);
  heightInput.value = bodyData.heightCm;
  ageInput.value = bodyData.age;
  targetWeightInput.value = bodyData.targetWeightKg;
  saveBodyProgress("바디 프로필을 저장했어요.");
  renderBodyHero();
}

function handleBodyEntrySubmit(event) {
  event.preventDefault();

  const weightKg = normalizeDecimalInput(bodyWeightInput.value);
  const date = bodyDateInput.dataset.value || getTodayDateKey();
  const note = bodyNoteInput.value.trim();

  if (!weightKg) {
    return;
  }

  const existingIndex = bodyData.entries.findIndex((entry) => entry.date === date);
  const nextEntry = { date, weightKg, note };

  if (existingIndex >= 0) {
    bodyData.entries[existingIndex] = nextEntry;
  } else {
    bodyData.entries.unshift(nextEntry);
  }

  bodyData.entries.sort((a, b) => b.date.localeCompare(a.date));
  saveBodyProgress("오늘 체크인을 저장했어요.");
  bodyEntryForm.reset();
  setBodyCalendarDate(getTodayDateKey());
  renderBodyProgress();
}

document.addEventListener("click", (event) => {
  if (isSettingsOpen && !event.target.closest(".settings-menu")) {
    setSettingsOpen(false);
  }

  if (!event.target.closest(".cell-context-menu")) {
    closeCellContextMenu();
  }

  if (isBodyCalendarOpen && !event.target.closest(".body-date-picker")) {
    setBodyCalendarOpen(false);
  }
});

document.addEventListener("scroll", closeCellContextMenu, true);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCellContextMenu();
  }
});

themeToggle.addEventListener("click", toggleTheme);
settingsButton.addEventListener("click", toggleSettingsMenu);
skinViewTab.addEventListener("click", () => setActiveView("skin"));
bodyViewTab.addEventListener("click", () => setActiveView("body"));
skinRoutineTab.addEventListener("click", () => setActiveSkinSection("routine"));
skinProductsTab.addEventListener("click", () => setActiveSkinSection("products"));
signInTab.addEventListener("click", () => setAuthMode("sign-in"));
signUpTab.addEventListener("click", () => setAuthMode("sign-up"));
authForm.addEventListener("submit", handleAuthSubmit);
logoutButton.addEventListener("click", handleLogout);
duplicateWeekButton.addEventListener("click", duplicateCurrentWeekToNextWeek);
exportButton.addEventListener("click", exportRoutineJson);
importButton.addEventListener("click", () => {
  setSettingsOpen(false);
  importFileInput.click();
});
prevWeekButton.addEventListener("click", showPreviousWeek);
nextWeekButton.addEventListener("click", showNextWeek);
importFileInput.addEventListener("change", importRoutineJson);
heightInput.addEventListener("change", handleBodyProfileInput);
ageInput.addEventListener("change", handleBodyProfileInput);
targetWeightInput.addEventListener("change", handleBodyProfileInput);
sexButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setSexValue(button.dataset.sexValue);
    saveBodyProgress("바디 프로필을 저장했어요.");
    renderBodyHero();
  });
});
bodyEntryForm.addEventListener("submit", handleBodyEntrySubmit);
skinProductForm.addEventListener("submit", handleSkinProductSubmit);
skinVideoForm.addEventListener("submit", handleSkinVideoSubmit);
skinVideoUrlInput.addEventListener("input", queueSkinVideoPreviewSync);
skinVideoUrlInput.addEventListener("change", queueSkinVideoPreviewSync);
skinVideoTitleInput.addEventListener("input", renderSkinVideoPreview);
skinVideoNoteInput.addEventListener("input", renderSkinVideoPreview);
bodyDateToggle.addEventListener("click", () => {
  bodyCalendarMonth = (bodyDateInput.dataset.value || getTodayDateKey()).slice(0, 7);
  setBodyCalendarOpen(!isBodyCalendarOpen);
});
skinProductImageZone.addEventListener("click", () => {
  skinProductImageInput.click();
});
skinProductImageZone.addEventListener("paste", handleSkinProductImagePaste);
skinProductImageZone.addEventListener("dragover", (event) => {
  event.preventDefault();
});
skinProductImageZone.addEventListener("drop", (event) => {
  event.preventDefault();
  loadSkinProductImageFromFile(event.dataTransfer?.files?.[0]);
});
skinProductImageInput.addEventListener("change", (event) => {
  loadSkinProductImageFromFile(event.target.files?.[0]);
  skinProductImageInput.value = "";
});
skinProductStatusInput.querySelectorAll("[data-product-status]").forEach((button) => {
  button.addEventListener("click", () => {
    setSkinProductStatus(button.dataset.productStatus);
  });
});

applyTheme(currentTheme);
setAuthMode("sign-in");
supabaseClient = initSupabase();
routineData = ensureTimelineWindow(routineData);
visibleWeekStart = getWeekStartIndex();
mobileOpenDay = getTodayIndex();
setBodyCalendarDate(getTodayDateKey());
setSkinProductStatus(skinProductStatus);
setSkinProductTargetCell(skinProductTargetCell.season, skinProductTargetCell.skinType);

if (supabaseClient) {
  syncSession();
} else {
  updateAuthUI();
  setAuthMessage("script.js에 Supabase URL과 anon key를 넣으면 로그인 기능이 활성화됩니다.");
}

render();
