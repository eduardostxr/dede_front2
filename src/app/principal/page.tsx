'use client'
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface cartasNacionalidadeI {
  nacionalidade: string;
  num: number;
}

interface geralDadosI {
  clientes: number;
  cartas: number;
  propostas: number;
}

type DataRow = [string, number, string];

export default function Principal() {
  const [cartasNacionalidade, setCartasNacionalidade] = useState<cartasNacionalidadeI[]>([]);
  const [dados, setDados] = useState<geralDadosI>({} as geralDadosI);

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/gerais`);
      const dados = await response.json();
      setDados(dados);
    }
    getDadosGerais();

    async function getDadosGrafico() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/cartasNacionalidade`);
      const dados = await response.json();
      setCartasNacionalidade(dados);
    }
    getDadosGrafico();
  }, []);

  const data: (["Nacionalidade", "NºCartas", { role: string }] | DataRow)[] = [
    ["Nacionalidade", "NºCartas", { role: "style" }],
  ];

  const cores = ["red", "blue", "violet", "green", "gold", "cyan", "chocolate", "purple", "brown", "orangered"];

  cartasNacionalidade.forEach((carta, index) => {
    data.push([carta.nacionalidade, carta.num, cores[index % 10]]);
  });

  const options = {
    backgroundColor: "#1a202c",
    chartArea: {
      backgroundColor: "#1a202c",
      width: "90%",
      height: "80%",
    },
    legend: {
      textStyle: { color: "#fff" },
    },
    hAxis: {
      textStyle: { color: "#fff" },
      titleTextStyle: { color: "#fff" },
    },
    vAxis: {
      textStyle: { color: "#fff" },
      titleTextStyle: { color: "#fff" },
    },
    titleTextStyle: {
      color: "#fff",
    },
  };

  return (
    <div className="bg-gray-900 container text-white pt-24">
      <h2 className="bg-gray-900 text-3xl mb-4 font-bold ">Visão Geral do Sistema</h2>

      <div className="bg-gray-900 w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.clientes}
          </span>
          <p className="font-bold mt-2 text-center">Nº Clientes</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.cartas}
          </span>
          <p className="font-bold mt-2 text-center">Nº Cartas</p>
        </div>
        <div className="border-green-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.propostas}
          </span>
          <p className="font-bold mt-2 text-center">Nº Propostas</p>
        </div>
      </div>

      <h2 className="bg-gray-900 text-2xl font-bold mt-4">Gráfico: Nº de Cartas por Nacionalidade</h2>
      <Chart
        className="bg-gray-900"
        chartType="ColumnChart"
        width="95%"
        height="380px"
        data={data}
        options={options}
      />
    </div>
  );
}
