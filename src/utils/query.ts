export const getQuery = (string: string, i?: string[]) =>
  string.split("-").reduce((acc, arr) => {
    switch (arr) {
      case "s":
        return acc + "SELECT ";
      case "w":
        return acc + "WHERE ";
      case "all":
        return acc + "* ";
      case "inn":
        return acc + "INNER JOIN ";
      case "f":
        return acc + "FROM ";
      case ".":
        return acc + "FROM ";
      case "=":
        return acc + "= ";
      default:
        if (Number(arr) >= 0 && Number(arr) <= 9) {
          return acc + i![Number(arr)];
        }
        return "";
    }
  }, "");
