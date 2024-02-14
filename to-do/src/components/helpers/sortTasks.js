const sortTasks = (list) => {
  const clone = [...list];
  
  if (!Array.isArray(list)) {
    throw new Error('List is not an array');
  }

  clone.sort((a, b) => {
    if (a.isCompleted && !b.isCompleted) {
      return 1;
    }
    if (!a.isCompleted && b.isCompleted) {
      return -1;
    }
    return 0;
  });
  
  return clone;
};

export default sortTasks;