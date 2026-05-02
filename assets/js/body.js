function setActiveSkinSection(section) {
  activeSkinSection = section === "products" ? "products" : "routine";
  localStorage.setItem(ACTIVE_SKIN_SECTION_KEY, activeSkinSection);
  render();
}

function setActiveBodySection(section) {
  activeBodySection = section === "workouts" ? "workouts" : "progress";
  localStorage.setItem(ACTIVE_BODY_SECTION_KEY, activeBodySection);
  render();
}

function setActiveView(view) {
  activeView = view === "body" ? "body" : "skin";
  localStorage.setItem(ACTIVE_VIEW_KEY, activeView);
  render();
}

function renderActiveView() {
  const isSkin = activeView === "skin";
  const isRoutine = activeSkinSection === "routine";
  const isBodyProgress = activeBodySection === "progress";
  skinView.hidden = !isSkin;
  bodyView.hidden = isSkin;
  skinViewTab.classList.toggle("is-active", isSkin);
  bodyViewTab.classList.toggle("is-active", !isSkin);
  skinViewTab.setAttribute("aria-pressed", String(isSkin));
  bodyViewTab.setAttribute("aria-pressed", String(!isSkin));
  skinSubtabs.hidden = !isSkin;
  skinRoutineTab.hidden = !isSkin;
  skinProductsTab.hidden = !isSkin;
  bodySubtabs.hidden = isSkin;
  bodyProgressTab.hidden = isSkin;
  bodyWorkoutTab.hidden = isSkin;
  skinRoutineSection.hidden = !isSkin || !isRoutine;
  skinProductsSection.hidden = !isSkin || isRoutine;
  bodyProgressSection.hidden = isSkin || !isBodyProgress;
  bodyWorkoutSection.hidden = isSkin || isBodyProgress;
  skinRoutineTab.classList.toggle("is-active", isRoutine);
  skinProductsTab.classList.toggle("is-active", !isRoutine);
  bodyProgressTab.classList.toggle("is-active", isBodyProgress);
  bodyWorkoutTab.classList.toggle("is-active", !isBodyProgress);
  skinRoutineTab.setAttribute("aria-pressed", String(isRoutine));
  skinProductsTab.setAttribute("aria-pressed", String(!isRoutine));
  bodyProgressTab.setAttribute("aria-pressed", String(isBodyProgress));
  bodyWorkoutTab.setAttribute("aria-pressed", String(!isBodyProgress));
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

function getBodyPartMeta(value) {
  return BODY_PARTS.find((item) => item.value === value) || BODY_PARTS[0];
}

function setBodyWorkoutPart(value) {
  bodyWorkoutPart = BODY_PARTS.some((item) => item.value === value) ? value : "chest";
  bodyPartButtons.forEach((button) => {
    const isActive = button.dataset.bodyPart === bodyWorkoutPart;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderBodyWorkoutImagePreview() {
  if (!bodyWorkoutImageData) {
    bodyWorkoutImagePreview.hidden = true;
    bodyWorkoutImagePreview.innerHTML = "";
    return;
  }

  bodyWorkoutImagePreview.hidden = false;
  bodyWorkoutImagePreview.innerHTML = `
    <img src="${bodyWorkoutImageData}" alt="Selected workout preview" />
    <button id="bodyWorkoutImageClearButton" class="skin-product-image-clear" type="button">
      <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
      <span>삭제</span>
    </button>
  `;

  document.getElementById("bodyWorkoutImageClearButton").addEventListener("click", () => {
    bodyWorkoutImageData = "";
    renderBodyWorkoutImagePreview();
  });
}

function renderBodyWorkoutCard(workout) {
  const meta = getBodyPartMeta(workout.bodyPart);

  return `
    <article class="body-workout-item">
      ${
        workout.imageDataUrl
          ? `<img class="body-workout-item-image" src="${workout.imageDataUrl}" alt="${escapeHtml(
              workout.title
            )}" />`
          : ""
      }
      <div class="body-workout-item-copy">
        <p class="summary-kicker">
          <ion-icon name="${meta.icon}" aria-hidden="true"></ion-icon>
          <span>${escapeHtml(meta.label)}</span>
        </p>
        <h3>${escapeHtml(workout.title || "이름 없는 운동")}</h3>
        ${
          workout.note
            ? `<p class="body-workout-note">${escapeHtml(workout.note)}</p>`
            : '<p class="body-workout-note is-muted">메모 없음</p>'
        }
      </div>
      <button
        class="button button-secondary body-workout-delete"
        type="button"
        data-workout-id="${workout.id}"
      >
        <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
        <span>삭제</span>
      </button>
    </article>
  `;
}

function renderBodyWorkoutList() {
  setBodyWorkoutPart(bodyWorkoutPart);
  renderBodyWorkoutImagePreview();

  if (!bodyData.workouts.length) {
    bodyWorkoutList.innerHTML = `
      <article class="body-workout-empty">
        <ion-icon name="fitness-outline" aria-hidden="true"></ion-icon>
        <div>
          <strong>아직 운동 메모가 없어요.</strong>
          <p>운동 이름, 몸 부위, 자세 이미지나 메모를 저장해두면 나만의 운동 라이브러리가 됩니다.</p>
        </div>
      </article>
    `;
    return;
  }

  bodyWorkoutList.innerHTML = BODY_PARTS.map((part) => {
    const workouts = bodyData.workouts.filter((workout) => workout.bodyPart === part.value);
    if (!workouts.length) {
      return "";
    }

    return `
      <section class="body-workout-group">
        <div class="body-workout-group-head">
          <ion-icon name="${part.icon}" aria-hidden="true"></ion-icon>
          <h3>${part.label}</h3>
          <span>${workouts.length}</span>
        </div>
        <div class="body-workout-group-list">
          ${workouts.map((workout) => renderBodyWorkoutCard(workout)).join("")}
        </div>
      </section>
    `;
  }).join("");

  bodyWorkoutList.querySelectorAll("[data-workout-id]").forEach((button) => {
    button.addEventListener("click", () => {
      bodyData.workouts = bodyData.workouts.filter(
        (workout) => workout.id !== button.dataset.workoutId
      );
      saveBodyProgress("운동 메모를 삭제했어요.");
      renderBodyWorkoutList();
    });
  });
}

function handleBodyWorkoutSubmit(event) {
  event.preventDefault();

  const title = bodyWorkoutTitleInput.value.trim();
  if (!title) {
    bodyWorkoutTitleInput.reportValidity();
    return;
  }

  bodyData.workouts.unshift({
    id: createSkinVideoId(),
    bodyPart: bodyWorkoutPart,
    title,
    note: bodyWorkoutNoteInput.value.trim(),
    imageDataUrl: bodyWorkoutImageData,
    addedAt: new Date().toISOString(),
  });

  saveBodyProgress("운동 메모를 저장했어요.");
  bodyWorkoutForm.reset();
  bodyWorkoutImageData = "";
  renderBodyWorkoutList();
}

function loadBodyWorkoutImageFromFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    bodyWorkoutImageData = typeof reader.result === "string" ? reader.result : "";
    renderBodyWorkoutImagePreview();
  };
  reader.readAsDataURL(file);
}

function handleBodyWorkoutImagePaste(event) {
  const items = Array.from(event.clipboardData?.items || []);
  const imageItem = items.find((item) => item.type.startsWith("image/"));
  if (!imageItem) {
    return;
  }

  event.preventDefault();
  loadBodyWorkoutImageFromFile(imageItem.getAsFile());
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
