(() => {
  const articles = [...document.querySelectorAll('.character')];
  const links = [...document.querySelectorAll('[data-character]')];
  const status = document.getElementById('selection-status');

  function selectCharacter(id, moveFocus) {
    const selected = articles.find(article => article.id === id);
    for (const article of articles) article.hidden = Boolean(selected) && article !== selected;
    for (const link of links) {
      if (selected && link.dataset.character === id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
    if (!selected) {
      status.textContent = articles.length ? '해당 캐릭터를 찾지 못했습니다. 전체 제작안을 표시합니다. 목록에서 다시 선택해 주세요.' : '아직 준비된 캐릭터 제작안이 없습니다.';
      return;
    }
    const heading = selected.querySelector('h2');
    status.textContent = `${heading.textContent} 제작안을 표시합니다.`;
    if (moveFocus) {
      selected.scrollIntoView({ block: 'start' });
      heading.focus({ preventScroll: true });
    }
  }

  function selectFromHash(moveFocus) {
    const id = location.hash.slice(1);
    if (id === 'character-index') return;
    selectCharacter(id || articles[0]?.id, moveFocus);
  }
  selectFromHash(false);
  window.addEventListener('hashchange', () => selectFromHash(true));

  for (const button of document.querySelectorAll('[data-copy]')) {
    button.hidden = false;
    button.addEventListener('click', async () => {
      const field = document.getElementById(button.dataset.copy);
      const message = button.closest('.full-prompt').querySelector('.copy-status');
      if (!field.value.trim()) {
        message.textContent = '복사할 프롬프트가 없습니다.';
        return;
      }
      button.disabled = true;
      message.textContent = '복사하는 중입니다.';
      try {
        await navigator.clipboard.writeText(field.value);
        message.textContent = '전체 영어 프롬프트를 복사했습니다.';
      } catch {
        field.focus();
        field.select();
        message.textContent = '자동 복사를 사용할 수 없습니다. 선택된 본문을 Ctrl+C 또는 기기의 복사 메뉴로 복사해 주세요.';
      } finally {
        button.disabled = false;
      }
    });
  }

  for (const image of document.querySelectorAll('.art-figure img')) {
    const message = image.nextElementSibling;
    const loaded = () => {
      message.hidden = true;
      message.setAttribute('aria-hidden', 'true');
      message.removeAttribute('role');
    };
    const failed = () => {
      message.hidden = false;
      message.removeAttribute('aria-hidden');
      message.setAttribute('role', 'status');
      message.textContent = '원화를 불러오지 못했습니다. 그림 링크를 눌러 큰 원화를 확인해 주세요.';
    };
    image.addEventListener('load', loaded);
    image.addEventListener('error', failed);
    if (image.complete) image.naturalWidth ? loaded() : failed();
    else message.hidden = false;
  }
})();
