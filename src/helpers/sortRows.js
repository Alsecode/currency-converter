const sortRows = (rows, arr) => (
  rows.sort((a, b) => {
    const indexA = arr.indexOf(a.ID);
    const indexB = arr.indexOf(b.ID);

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    if (indexA !== -1) {
      return -1;
    }
    if (indexB !== -1) {
      return 1;
    }

    return 0;
  })
);

export default sortRows;
