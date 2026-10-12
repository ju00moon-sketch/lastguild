for (const video of document.querySelectorAll('video')) {
  const status = video.parentElement.querySelector('.media-status');
  const ready = () => { status.textContent = '재생 버튼으로 영상을 확인하실 수 있습니다.'; };
  const failed = () => { status.textContent = '영상을 불러오지 못했습니다. 아래 영상 파일 링크를 열거나 페이지를 새로고침해 주세요.'; };
  video.addEventListener('loadedmetadata', ready);
  video.addEventListener('canplay', ready);
  video.addEventListener('waiting', () => { status.textContent = '영상을 불러오는 중입니다.'; });
  video.addEventListener('playing', () => { status.textContent = '영상 재생 중입니다.'; });
  video.addEventListener('pause', ready);
  video.addEventListener('ended', () => { status.textContent = '재생이 끝났습니다. 재생 버튼으로 다시 보실 수 있습니다.'; });
  video.addEventListener('error', failed);
  if (video.error) failed();
  else if (video.readyState >= 1) ready();
}

for (const image of document.querySelectorAll('.render-link img')) {
  const status = image.parentElement.querySelector('.image-status');
  const loaded = () => { status.hidden = true; };
  const failed = () => {
    status.hidden = false;
    status.textContent = '그림을 불러오지 못했습니다. 눌러서 원본 크기의 그림을 열거나 새로고침해 주세요.';
  };
  image.addEventListener('load', loaded);
  image.addEventListener('error', failed);
  if (image.complete) image.naturalWidth ? loaded() : failed();
}
