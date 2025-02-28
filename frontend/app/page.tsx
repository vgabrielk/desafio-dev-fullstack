"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChartNoAxesColumnIncreasing, CirclePlus } from "lucide-react";
import api from "./api/api";
import { Lead } from "./interfaces/Lead";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [simulations, setSimulations] = useState(0);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await api.get('leads');
        console.log(response)
        setLeads(response.data);

        setSimulations(response.data.length);  
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
    };

    fetchLeads();
  }, []);

  const redirectLista = () => window.location.href = '/listagem'
  const redirectCriar = () => window.location.href = '/simular'

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Total de simulações</CardTitle>
            <ChartNoAxesColumnIncreasing className="w-6 h-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{simulations}</p>
          </CardContent>
          <CardContent className="space-y-2">
          <CardDescription>
            Clique no botão abaixo para visualizar suas simulações de compensação energética.  <br/>
         Você poderá exportar um arquivo em PDF contendo informações de suas conta decodificada, filtrar por nome, telefone, email, etc;
            </CardDescription>
            <Button className="bg-green-500" onClick={redirectLista}>Ver simulações</Button>
          </CardContent>
        </Card>

      </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader className="flex  flex-row items-center justify-between">
            <CardTitle>Nova simulação</CardTitle>
          
            <CirclePlus className="w-6 h-6 text-blue-500" />
          </CardHeader>
          <CardContent className="space-y-2">
          <CardDescription>
            Clique no botão abaixo para criar uma nova simulação de compensação energética.  <br/>
          Insira os dados do seu nome, e-mail, telefone e informações da conta de energia para 
          calcular o seu plano de compensação.
            </CardDescription>
            <Button className="bg-blue-500" onClick={redirectCriar}>Criar nova simulação</Button>
          </CardContent>
        </Card>

      </div>
      <Card>
        <CardHeader>
          <CardTitle>Últimas Simulações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead : Lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.nomeCompleto}</TableCell>
                  <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{lead.email}</TableCell>  
                  <TableCell>
                 {lead.telefone}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
