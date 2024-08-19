const Api_url =
  'http://localhost:3000' || 'https://pet-finder-hpfq.onrender.com';
export async function init() {
  const token = await localStorage.token;
  if (token) {
    const respuesta = await fetch(Api_url + '/init/token', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + JSON.parse(token),
      },
    });
    const res = await respuesta.json();

    return res;
  }
  return false;
}
export async function cerrarSesion() {
  localStorage.removeItem('token');
}
export async function auth(cs: any) {
  const auth = await fetch(Api_url + '/auth', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cs),
  });
  const json = await auth.json();
  const res = await json;

  return res;
}
export async function singin(email: string, password: string) {
  const sing = await fetch(Api_url + '/auth/token', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const res = await sing.json();

  return res;
}
export async function modificar(data: any, id: any) {
  const respuesta = await fetch(Api_url + '/datos/' + id, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const res = await respuesta.json();
  return res;
}
export async function createPet(data: any) {
  const res = await fetch(Api_url + '/pet', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const respuestaJSON = await res.json();

  return respuestaJSON;
}
export async function getPetCerca(lat: Number, lng: Number, email?: string) {
  const res = await fetch(
    Api_url + `/pet-cerca-de?lat=${lat}&lng=${lng}&email=${email}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();
  return data;
}
export async function modiPet(newpets: any, id: any) {
  const respuesta = await fetch(Api_url + '/pet/' + id, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newpets),
  });
  const res = await respuesta.json();

  return res;
}
export async function deletePet(id: any) {
  await fetch(Api_url + '/pet/' + id, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
export async function sendEmail(newMessage: any) {
  const res = await fetch(Api_url + '/sendinblue', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMessage),
  });
  const respuesta = res.json();
  return respuesta;
}
