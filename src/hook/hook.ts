import {atom} from 'recoil';

export const user = atom({
  key: 'user',
  default: {
    email: '',
    fullName: '',
    id: '',
  },
});
// export function petsCerca() {
export const petsCerca = atom({
  key: 'petsCerca',
  default: [],
});
export const token = atom({
  key: 'token',
  default: '',
});
export const myreport = atom({
  key: 'myreport',
  default: [],
});
export const modPet = atom({
  key: 'modPet',
  default: {
    id: 0,
    img: '',
    lugar: '',
    name: '',
    dataUrl: '',
    ubi: [],
  },
});
