export function hexToRgb(hex: string): [number, number, number] {
  // 정규식을 사용하여 유효한 Hex 컬러 형식인지 확인
  const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const result = hexRegex.exec(hex);

  if (!result) {
    // 유효한 Hex 컬러 형식이 아니면 null 반환
    return [0, 0, 0];
  }

  // RGB 값 추출 및 반환
  const [, r, g, b] = result;
  return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
}

export function rgbToHex(rgb: [number, number, number]): string {
  // 각 RGB 값을 16진수로 변환하고 두 자리로 맞춤
  const rHex = rgb[0].toString(16).padStart(2, '0').toUpperCase();
  const gHex = rgb[1].toString(16).padStart(2, '0').toUpperCase();
  const bHex = rgb[2].toString(16).padStart(2, '0').toUpperCase();

  // Hex 형식으로 조합하여 반환
  return `#${rHex}${gHex}${bHex}`;
}

export function extractRgbFromString(rgbString: string): [number, number, number] {
  // 정규식을 사용하여 RGB 문자열에서 숫자 부분 추출
  const rgbRegex = /RGB\((\d+),\s*(\d+),\s*(\d+)\)/;
  const result = rgbRegex.exec(rgbString.toUpperCase());

  if (!result) {
    // 유효한 RGB 문자열 형식이 아니면 null 반환
    return [0, 0, 0];
  }

  // 추출한 숫자 부분을 각각의 RGB 구성 요소로 변환하여 반환
  const [, r, g, b] = result;
  return [parseInt(r, 10), parseInt(g, 10), parseInt(b, 10)];
}

export function safeRange(min: number, max: number, num: number) {
  if (num >= max) return max;
  if (num <= min) return min;
  return num;
}

export function darkenHexColor(hexColor: string, percentage: number): string {
  // 밝기를 조절하는 함수
  const adjustBrightness = (value: number, percentage: number): number => {
    return Math.round(value * (1 - percentage / 100));
  };

  const [r, g, b] = hexToRgb(hexColor);

  // 각 색상 채널에 어둡기를 적용
  const darkenedR = adjustBrightness(r, percentage);
  const darkenedG = adjustBrightness(g, percentage);
  const darkenedB = adjustBrightness(b, percentage);

  // 어둡게 조절된 RGB를 HEX로 변환하여 반환
  return rgbToHex([darkenedR, darkenedG, darkenedB]);
}
