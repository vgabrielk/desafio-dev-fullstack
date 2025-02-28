"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Wallet, Users, CreditCard } from "lucide-react";

const data = [
  { name: "Jan", value: 400 },
  { name: "Fev", value: 800 },
  { name: "Mar", value: 600 },
  { name: "Abr", value: 900 },
  { name: "Mai", value: 1200 },
];

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Total Vendas</CardTitle>
            <Wallet className="w-6 h-6 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 45.000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Clientes</CardTitle>
            <Users className="w-6 h-6 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1.200</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Pagamentos</CardTitle>
            <CreditCard className="w-6 h-6 text-purple-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 12.000</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendas nos últimos meses</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Transações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>João Silva</TableCell>
                <TableCell>20/02/2025</TableCell>
                <TableCell>R$ 1.200</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Maria Souza</TableCell>
                <TableCell>18/02/2025</TableCell>
                <TableCell>R$ 850</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lucas Lima</TableCell>
                <TableCell>15/02/2025</TableCell>
                <TableCell>R$ 2.000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
