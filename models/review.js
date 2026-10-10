const views = Array.from(document.querySelectorAll('[data-view]'));
const comparison = document.getElementById('comparison');
const emptyViews = document.getElementById('empty-views');

function showImageStatus(image, message) {
  const status = image.parentElement.querySelector('.image-status');
  status.textContent = message;
  status.hidden = !message;
}

for (const image of document.querySelectorAll('.render-link img')) {
  image.addEventListener('load', () => showImageStatus(image, ''));
  image.addEventListener('error', () => showImageStatus(image, '그림을 불러오지 못했습니다. 눌러서 전체 그림을 확인하거나 페이지를 새로고침해 주세요.'));
  if (image.complete) {
    showImageStatus(image, image.naturalWidth ? '' : '그림을 불러오지 못했습니다. 눌러서 전체 그림을 확인하거나 페이지를 새로고침해 주세요.');
  }
}

comparison.hidden = views.length === 0;
emptyViews.hidden = views.length !== 0;

for (const button of views) {
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    const view = button.dataset.view;
    const label = button.textContent.trim();
    for (const option of views) option.setAttribute('aria-pressed', String(option === button));
    for (const caption of document.querySelectorAll('[data-view-label]')) caption.textContent = label;
    for (const [variant, title] of [['before', '수정 전'], ['after', '수정 후']]) {
      const image = document.getElementById(`${variant}-image`);
      const link = document.getElementById(`${variant}-link`);
      showImageStatus(image, '그림을 불러오는 중입니다.');
      image.alt = `칼날 ${title} 릴리의 공격 22프레임 ${label} 확대`;
      link.href = `images/blade-${variant}-${view}-full.png`;
      link.setAttribute('aria-label', `${title} ${label} 전체 자세 보기`);
      image.src = `images/blade-${variant}-${view}.png`;
    }
  });
}
