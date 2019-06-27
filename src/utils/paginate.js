import _ from 'lodash';

export function paginate (items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;

  // 1) convert items array to _ wrapper, 2)start slice from strtIndex _.slice (items, startIndex);
  // 3)chain with take;4) convert _ wrapper into regular array

  return _ (items).slice (startIndex).take (pageSize).value ();
}