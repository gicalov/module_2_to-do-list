const sortTasks = (list) => {
  const cloneList = [...list];
  
  if (!Array.isArray(list)) {
    throw new Error('List is not an array');
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