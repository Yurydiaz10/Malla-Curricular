const ramos = [
  {
    nombre: "Cálculo",
    id: "calculo",
    desbloquea: ["algebra", "matematica"]
  },
  {
    nombre: "Álgebra Lineal",
    id: "algebra",
    requiere: ["calculo"],
    desbloquea: ["estadistica1", "investigacion"]
  },
  {
    nombre: "Matemática para finanzas",
    id: "matematica",
    requiere: ["calculo"],
    desbloquea: ["evaluacion"]
  },
  {
    nombre: "Evaluación financiera de proyectos",
    id: "evaluacion",
    requiere: ["matematica"]
  },
  {
    nombre: "Fundamentos de contabilidad",
    id: "fundamentos_contabilidad",
    desbloquea: ["contabilidad_corto", "costos"]
  },
  {
    nombre: "Contabilidad de los recursos y obligaciones de corto plazo",
    id: "contabilidad_corto",
    requiere: ["fundamentos_contabilidad"],
    desbloquea: ["contabilidad_largo"]
  },
  {
    nombre: "Contabilidad de los recursos y obligaciones de largo plazo y patrimonio",
    id: "contabilidad_largo",
    requiere: ["contabilidad_corto"]
  },
  {
    nombre: "Costos",
    id: "costos",
    requiere: ["fundamentos_contabilidad"],
    desbloquea: ["presupuestos"]
  },
  {
    nombre: "Presupuestos",
    id: "presupuestos",
    requiere: ["costos"]
  },
  {
    nombre: "Introducción al derecho y constitución política",
    id: "intro_derecho",
    desbloquea: ["legislacion1", "laboral", "hacienda", "renta"]
  },
  {
    nombre: "Legislación comercial I",
    id: "legislacion1",
    requiere: ["intro_derecho"],
    desbloquea: ["legislacion2"]
  },
  {
    nombre: "Legislación comercial II",
    id: "legislacion2",
    requiere: ["legislacion1"]
  },
  {
    nombre: "Legislación laboral",
    id: "laboral",
    requiere: ["intro_derecho"]
  },
  {
    nombre: "Hacienda pública",
    id: "hacienda",
    requiere: ["intro_derecho", "economia"],
    desbloquea: ["contabilidad_publica"]
  },
  {
    nombre: "Contabilidad pública",
    id: "contabilidad_publica",
    requiere: ["hacienda", "informes"]
  },
  {
    nombre: "Impuesto a la renta y complementarios, impuesto al patrimonio",
    id: "renta",
    requiere: ["intro_derecho"],
    desbloquea: ["iva"]
  },
  {
    nombre: "Impuestos de IVA y consumo, y Mecanismo de retención en la fuente",
    id: "iva",
    requiere: ["renta"],
    desbloquea: ["procedimiento"]
  },
  {
    nombre: "Procedimiento tributario",
    id: "procedimiento",
    requiere: ["iva"]
  }
];

const mallaDiv = document.getElementById("malla");

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.className = "ramo bloqueado";
  div.innerText = ramo.nombre;
  div.id = ramo.id;
  div.onclick = () => aprobarRamo(ramo, div);
  mallaDiv.appendChild(div);
}

function desbloquearRamo(id) {
  const elem = document.getElementById(id);
  if (elem && elem.classList.contains("bloqueado")) {
    elem.classList.remove("bloqueado");
  }
}

function aprobarRamo(ramo, div) {
  if (div.classList.contains("bloqueado") || div.classList.contains("aprobado")) return;

  div.classList.add("aprobado");

  if (ramo.desbloquea) {
    ramo.desbloquea.forEach(id => {
      const reqs = ramos.find(r => r.id === id)?.requiere || [];
      const aprobados = reqs.every(rid => document.getElementById(rid).classList.contains("aprobado"));
      if (aprobados) desbloquearRamo(id);
    });
  }
}

function inicializar() {
  ramos.forEach(ramo => crearRamo(ramo));

  // desbloquea los que no tienen prerequisitos
  ramos.forEach(ramo => {
    if (!ramo.requiere || ramo.requiere.length === 0) desbloquearRamo(ramo.id);
  });
}

inicializar();
