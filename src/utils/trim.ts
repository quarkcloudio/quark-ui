const trim = (
  trimString: string,
  trimChar: string = ' ',
  type: string = '',
) => {
  if (trimChar) {
    if (type === 'left') {
      return trimString.replace(new RegExp('^\\' + trimChar + '+', 'g'), '');
    } else if (type === 'right') {
      return trimString.replace(new RegExp('\\' + trimChar + '+$', 'g'), '');
    }
    return trimString.replace(
      new RegExp('^\\' + trimChar + '+|\\' + trimChar + '+$', 'g'),
      '',
    );
  }

  return trimString.replace(/^\s+|\s+$/g, '');
};

export default trim;
