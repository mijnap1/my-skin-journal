const STORAGE_KEY = "my-skin-journal-routine-v1";
const THEME_STORAGE_KEY = "my-skin-journal-theme";

const defaultRoutine = [
  {
    day: "월",
    morning: "물 or 폼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "폼",
    skincare: "비타민C → 수분크림 → (필요 시) 에스트라",
    extraCare: "면도",
    done: false,
    notes: "",
  },
  {
    day: "화",
    morning: "물 or 폼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "오일 → 폼",
    skincare: "레티놀 → 수분크림 → 에스트라",
    extraCare: "코털 정리",
    done: false,
    notes: "",
  },
  {
    day: "수",
    morning: "물 or 폼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "폼",
    skincare: "비타민C → 수분크림 → (필요 시) 에스트라",
    extraCare: "면도",
    done: false,
    notes: "",
  },
  {
    day: "목",
    morning: "물 or 폼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "폼",
    skincare: "비타민C → 수분크림 → (필요 시) 에스트라",
    extraCare: "없음",
    done: false,
    notes: "",
  },
  {
    day: "금",
    morning: "물 or 폼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "오일 → 폼",
    skincare: "레티놀 → 수분크림 → 에스트라",
    extraCare: "면도",
    done: false,
    notes: "",
  },
  {
    day: "토",
    morning: "물 or 폼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "폼",
    skincare: "클레이 → 토너 → 수분크림 → 에스트라",
    extraCare: "코털 정리",
    done: false,
    notes: "",
  },
  {
    day: "일",
    morning: "물 or 폼 → 나이아신아마이드 → 수분크림 → 선크림",
    eveningCleanse: "폼",
    skincare: "비타민C → 수분·진정 마스크팩 → 수분크림 → (필요 시) 에스트라",
    extraCare: "면도",
    done: false,
    notes: "",
  },
];

const tableBody = document.getElementById("routineTableBody");
const mobileCards = document.getElementById("mobileCards");
const resetButton = document.getElementById("resetButton");
const saveStatus = document.getElementById("saveStatus");
const themeToggle = document.getElementById("themeToggle");

let routineData = loadRoutine();
let currentTheme = loadTheme();
let mobileOpenDay = getTodayIndex();
let mobileEditDay = null;

function cloneDefaultRoutine() {
  return JSON.parse(JSON.stringify(defaultRoutine));
}

function loadRoutine() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return cloneDefaultRoutine();
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length !== defaultRoutine.length) {
      return cloneDefaultRoutine();
    }

    return defaultRoutine.map((day, index) => ({
      ...day,
      ...parsed[index],
      day: day.day,
      done: Boolean(parsed[index]?.done),
      notes: typeof parsed[index]?.notes === "string" ? parsed[index].notes : "",
    }));
  } catch (error) {
    console.warn("Failed to read saved routine:", error);
    return cloneDefaultRoutine();
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  return "dark";
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

function saveRoutine(message = "로컬에 자동 저장됨", stateClass = "saved") {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(routineData));
  flashStatus(message, stateClass);
}

function flashStatus(message, stateClass) {
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

function getTodayIndex() {
  const jsDay = new Date().getDay();
  return jsDay === 0 ? 6 : jsDay - 1;
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
  checkbox.setAttribute("aria-label", `${routineData[index].day} 완료 체크`);
  return checkbox;
}

function createRoutineDisplay(value, index, field, isNotes = false) {
  const display = document.createElement("div");
  display.className = `cell-display is-editable${isNotes ? " note-display" : ""}`;
  display.tabIndex = 0;
  display.setAttribute("role", "button");
  display.setAttribute(
    "aria-label",
    `${routineData[index].day} ${field} ${isNotes ? "노트" : "루틴"} 더블클릭 편집`
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

  const wrapper = document.createElement("div");
  wrapper.className = "routine-steps";

  const parts = value
    .split("→")
    .map((part) => part.trim())
    .filter(Boolean);

  if (!parts.length) {
    const empty = document.createElement("span");
    empty.className = "cell-placeholder";
    empty.textContent = "더블클릭해서 루틴을 입력하세요.";
    display.appendChild(empty);
    return display;
  }

  parts.forEach((part) => {
    const pill = document.createElement("span");
    pill.className = "routine-step";
    if (
      /레티놀|비타민C|클레이|마스크팩|에스트라|선크림|나이아신아마이드/.test(part)
    ) {
      pill.classList.add("is-emphasis");
    }
    pill.textContent = part;
    wrapper.appendChild(pill);
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
      const nextValue = textarea.value.trim();
      routineData[index][field] = nextValue;
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
  const todayIndex = getTodayIndex();

  routineData.forEach((entry, index) => {
    const row = document.createElement("tr");
    if (index === todayIndex) {
      row.classList.add("today-row");
    }

    const dayCell = document.createElement("td");
    dayCell.innerHTML = `
      <div class="day-chip">
        <span>${entry.day}</span>
        ${index === todayIndex ? '<span class="today-badge">Today</span>' : ""}
      </div>
    `;

    const morningCell = document.createElement("td");
    morningCell.appendChild(createRoutineDisplay(entry.morning, index, "morning"));

    const eveningCell = document.createElement("td");
    eveningCell.appendChild(
      createRoutineDisplay(entry.eveningCleanse, index, "eveningCleanse")
    );

    const skincareCell = document.createElement("td");
    skincareCell.appendChild(createRoutineDisplay(entry.skincare, index, "skincare"));

    const extraCell = document.createElement("td");
    extraCell.appendChild(createRoutineDisplay(entry.extraCare, index, "extraCare"));

    const doneCell = document.createElement("td");
    doneCell.className = "checkbox-wrap";
    doneCell.appendChild(createCheckbox(entry.done, index));

    const noteCell = document.createElement("td");
    noteCell.appendChild(createRoutineDisplay(entry.notes, index, "notes", true));

    row.append(
      dayCell,
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
  const todayIndex = getTodayIndex();

  routineData.forEach((entry, index) => {
    const card = document.createElement("article");
    const isOpen = mobileOpenDay === index;
    const isEditing = mobileEditDay === index;
    card.className = `routine-mobile-card card${isOpen ? " is-open" : ""}${
      isEditing ? " is-editing" : ""
    }`;

    card.innerHTML = `
      <div class="mobile-card-head">
        <div class="mobile-card-main">
          <div class="mobile-day-wrap">
            <div class="mobile-day ${index === todayIndex ? "today-label" : ""}">
              ${entry.day}
            </div>
            ${
              index === todayIndex
                ? '<span class="today-badge mobile-today-badge">Today</span>'
                : ""
            }
          </div>
          <div class="mobile-card-summary">
            <span>${entry.skincare.split("→")[0].trim()}</span>
            <span class="mobile-summary-dot"></span>
            <span>${entry.extraCare}</span>
          </div>
        </div>
        <div class="mobile-card-actions">
          <label class="mobile-done-toggle" aria-label="${entry.day} 완료 체크">
            <span>Done</span>
          </label>
          <button class="mobile-icon-button mobile-edit-button" type="button" aria-label="Edit ${entry.day}">
            <ion-icon name="${isEditing ? "checkmark-outline" : "create-outline"}" aria-hidden="true"></ion-icon>
          </button>
          <button class="mobile-icon-button mobile-expand-button" type="button" aria-expanded="${String(
            isOpen
          )}" aria-label="${entry.day} details">
            <ion-icon name="${isOpen ? "chevron-up-outline" : "chevron-down-outline"}" aria-hidden="true"></ion-icon>
          </button>
        </div>
      </div>
      <div class="mobile-card-body" ${isOpen ? "" : "hidden"}></div>
    `;

    const doneWrap = card.querySelector(".mobile-done-toggle");
    doneWrap.appendChild(createCheckbox(entry.done, index));

    card.querySelector(".mobile-edit-button").addEventListener("click", () => {
      toggleMobileEdit(index);
    });
    card.querySelector(".mobile-expand-button").addEventListener("click", () => {
      toggleMobileOpen(index);
    });

    const body = card.querySelector(".mobile-card-body");
    body.appendChild(
      createMobileField(
        "Morning routine",
        "sunny-outline",
        index,
        "morning",
        entry.morning,
        isEditing
      )
    );
    body.appendChild(
      createMobileField(
        "Evening cleanse",
        "moon-outline",
        index,
        "eveningCleanse",
        entry.eveningCleanse,
        isEditing
      )
    );
    body.appendChild(
      createMobileField(
        "Afternoon/Evening skincare",
        "flask-outline",
        index,
        "skincare",
        entry.skincare,
        isEditing
      )
    );
    body.appendChild(
      createMobileField(
        "Extra care",
        "sparkles-outline",
        index,
        "extraCare",
        entry.extraCare,
        isEditing
      )
    );
    body.appendChild(
      createMobileField("Notes", "document-text-outline", index, "notes", entry.notes, isEditing, true)
    );

    mobileCards.appendChild(card);
  });
}

function render() {
  renderTable();
  renderMobileCards();
}

resetButton.addEventListener("click", () => {
  routineData = cloneDefaultRoutine();
  localStorage.removeItem(STORAGE_KEY);
  render();
  flashStatus("기본 루틴으로 리셋됨", "reset");
});

themeToggle.addEventListener("click", toggleTheme);

applyTheme(currentTheme);
render();
