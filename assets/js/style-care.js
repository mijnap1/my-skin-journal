function getStyleCategoryMeta(value) {
  return STYLE_CATEGORIES.find((item) => item.value === value) || STYLE_CATEGORIES[0];
}

function setStyleCategory(value) {
  styleCategory = STYLE_CATEGORIES.some((item) => item.value === value) ? value : "outfit";
  styleCategoryButtons.forEach((button) => {
    const isActive = button.dataset.styleCategory === styleCategory;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function saveStyleBoard(message = "스타일 메모를 저장했어요.") {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(buildAppPayload()));
  queueRemoteSave();
  flashStatus(message, "saved");
}

function renderStyleImagePreview() {
  if (!styleItemImageData) {
    styleItemImagePreview.hidden = true;
    styleItemImagePreview.innerHTML = "";
    return;
  }

  styleItemImagePreview.hidden = false;
  styleItemImagePreview.innerHTML = `
    <img src="${styleItemImageData}" alt="Selected style preview" />
    <button id="styleItemImageClearButton" class="skin-product-image-clear" type="button">
      <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
      <span>삭제</span>
    </button>
  `;

  document.getElementById("styleItemImageClearButton").addEventListener("click", () => {
    styleItemImageData = "";
    renderStyleImagePreview();
  });
}

function renderStyleItemCard(item) {
  const safeLink = escapeHtml(item.link || "");

  return `
    <article class="style-item-card${item.imageDataUrl ? "" : " has-no-image"}">
      ${
        item.imageDataUrl
          ? `<img class="style-item-image" src="${item.imageDataUrl}" alt="${escapeHtml(
              item.title
            )}" />`
          : ""
      }
      <div class="style-item-copy">
        <h3>${escapeHtml(item.title || "이름 없는 스타일")}</h3>
        ${
          item.note
            ? `<p class="style-item-note">${escapeHtml(item.note)}</p>`
            : '<p class="style-item-note is-muted">메모 없음</p>'
        }
      </div>
      <div class="style-item-actions">
        ${
          item.link
            ? `
              <a
                class="button button-secondary style-item-link"
                href="${safeLink}"
                target="_blank"
                rel="noreferrer noopener"
              >
                <ion-icon name="open-outline" aria-hidden="true"></ion-icon>
                <span>열기</span>
              </a>
            `
            : ""
        }
        <button class="button button-secondary style-item-delete" type="button" data-style-id="${item.id}">
          <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
          <span>삭제</span>
        </button>
      </div>
    </article>
  `;
}

function renderStyleBoard() {
  setStyleCategory(styleCategory);
  renderStyleImagePreview();

  if (!styleData.items.length) {
    styleItemList.innerHTML = `
      <article class="style-empty">
        <ion-icon name="shirt-outline" aria-hidden="true"></ion-icon>
        <div>
          <strong>아직 스타일 메모가 없어요.</strong>
          <p>코디, 향수, 헤어스타일, 사고 싶은 아이템을 이미지와 함께 저장해보세요.</p>
        </div>
      </article>
    `;
    return;
  }

  styleItemList.innerHTML = STYLE_CATEGORIES.map((category) => {
    const items = styleData.items.filter((item) => item.category === category.value);
    if (!items.length) {
      return "";
    }

    return `
      <section class="style-group">
        <div class="style-group-head">
          <ion-icon name="${category.icon}" aria-hidden="true"></ion-icon>
          <h3>${category.label}</h3>
          <span>${items.length}</span>
        </div>
        <div class="style-group-list">
          ${items.map((item) => renderStyleItemCard(item)).join("")}
        </div>
      </section>
    `;
  }).join("");

  styleItemList.querySelectorAll("[data-style-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const itemIndex = styleData.items.findIndex((item) => item.id === button.dataset.styleId);
      if (itemIndex < 0) {
        return;
      }
      const removedItem = cloneForUndo(styleData.items[itemIndex]);
      styleData.items = styleData.items.filter((item) => item.id !== button.dataset.styleId);
      saveStyleBoard("스타일 메모를 삭제했어요.");
      renderStyleBoard();
      showUndoToast("스타일 메모가 삭제됐어요.", () => {
        if (styleData.items.some((item) => item.id === removedItem.id)) {
          return;
        }
        styleData.items.splice(itemIndex, 0, removedItem);
        saveStyleBoard("삭제를 되돌렸어요.");
        renderStyleBoard();
      });
    });
  });
}

function handleStyleItemSubmit(event) {
  event.preventDefault();

  const title = styleItemTitleInput.value.trim();
  if (!title) {
    styleItemTitleInput.reportValidity();
    return;
  }

  styleData.items.unshift({
    id: createSkinVideoId(),
    category: styleCategory,
    title,
    link: styleItemLinkInput.value.trim(),
    note: styleItemNoteInput.value.trim(),
    imageDataUrl: styleItemImageData,
    addedAt: new Date().toISOString(),
  });

  saveStyleBoard("스타일 메모를 저장했어요.");
  styleItemForm.reset();
  styleItemImageData = "";
  renderStyleBoard();
}

function loadStyleImageFromFile(file) {
  if (!file || !file.type.startsWith("image/")) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    styleItemImageData = typeof reader.result === "string" ? reader.result : "";
    renderStyleImagePreview();
  };
  reader.readAsDataURL(file);
}

function handleStyleImagePaste(event) {
  const items = Array.from(event.clipboardData?.items || []);
  const imageItem = items.find((item) => item.type.startsWith("image/"));
  if (!imageItem) {
    return;
  }

  event.preventDefault();
  loadStyleImageFromFile(imageItem.getAsFile());
}
