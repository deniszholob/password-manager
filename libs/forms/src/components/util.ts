export function generateFormlyOptions(values: string[], labels?: string[]) {
  const returnArray = values.map((v, i) => {
    return {
      value: v,
      label: labels && labels[i] ? labels[i] : capitalizeFirstLetter(v),
    };
  });
  // returnArray.push({
  //   label: '---',
  //   value: null,
  // });
  return returnArray;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
