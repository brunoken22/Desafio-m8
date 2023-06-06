const Api_url = "https://pet-finder-hpfq.onrender.com";

export async function init() {
   if (localStorage.token) {
      const data = localStorage.getItem("token");
      if (data == '""' || data == "undefined") return;
      if (data) {
         const respuesta = await fetch(Api_url + "/init/token", {
            headers: {
               "Content-Type": "application/json",
               Authorization: "bearer " + JSON.parse(data),
            },
         });
         const res = await respuesta.json();
         return res;
      }
   }
   return false;
}
export async function cerrarSesion() {
   localStorage.removeItem("token");
}
export async function auth(cs: any) {
   // const cs = this.getState();
   const auth = await fetch(Api_url + "/auth", {
      method: "post",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(cs),
   });
   const json = await auth.json();
   const res = await json;
   // this.setState({
   //    ...res.auth,
   //    token: res.token,
   // });
   return res;
}
export async function singin(email: string, password: string) {
   const sing = await fetch(Api_url + "/auth/token", {
      method: "post",
      headers: {
         "Content-Type": "application/json",
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
   const respuesta = await fetch(Api_url + "/datos/" + id, {
      method: "put",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   const res = await respuesta.json();
   return res;
}
export async function createPet(data: any, id: Number) {
   const res = await fetch(Api_url + "/pet/" + id, {
      method: "post",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   const respuestaJSON = await res.json();

   return respuestaJSON;
}
export async function getPetCerca(lat: Number, lng: Number) {
   const res = await fetch(Api_url + `/pet-cerca-de?lat=${lat}&lng=${lng}`, {
      headers: {
         "Content-Type": "application/json",
      },
   });
   const data = await res.json();
   // console.log(data);

   // if (data[0]) {
   //    this.petsCerca = data[0].hits;
   // }

   return data;
}
export async function modiPet(newpets: any, id: any) {
   const respuesta = await fetch(Api_url + "/pet/" + id, {
      method: "put",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(newpets),
   });
   const res = await respuesta.json();

   return res;
}
export async function deletePet(id: any) {
   await fetch(Api_url + "/pet/" + id, {
      method: "delete",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
   });
}
// export async function setState(newState: any) {
//    if (newState.fullName) {
//       this.data = newState;
//    } else {
//       this.pets = [...newState];
//       for (let cb of this.listeners) {
//          cb();
//       }
//    }
//    localStorage.setItem("token", JSON.stringify(this.data.token));
// }
