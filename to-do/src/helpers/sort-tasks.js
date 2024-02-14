const sortTasks = (list) => {
  const cloneList = [...list];

  if (!Array.isArray(list)) {
    return;
  }

  cloneList.sort((a, b) => {
    if (a.isCompleted && !b.isCompleted) {
      return 1;
    }
    if (!a.isCompleted && b.isCompleted) {
      return -1;
    }
    return 0;
  });

  return cloneList;
};

export default sortTasks;
