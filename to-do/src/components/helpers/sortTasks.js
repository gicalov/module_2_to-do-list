const sortTasks = (list) => {

  if (!Array.isArray(list)) {
    throw new Error('List is not an array');
  }

  list.sort((a, b) => {
    if (a.isCompleted && !b.isCompleted) {
      return 1;
    }
    if (!a.isCompleted && b.isCompleted) {
      return -1;
    }
    return 0;
  });
  
  return list;
};

export default sortTasks;