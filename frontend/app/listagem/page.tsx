"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import api from "../api/api";
import { Unidade } from "../interfaces/Unidade";
import { Consumo } from "../interfaces/Consumo";
import { Progress } from "@/components/ui/progress";
import { Lead } from "../interfaces/Lead";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PDFDownloadLink } from '@react-pdf/renderer'
import { SimulacoesPDF } from "@/components/pdf/simulacoes-pdf";
export default function Listagem() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [filters, setFilters] = useState({
    nomeCompleto: "",
    email: "",
    telefone: "",
    dataInicio: "",
    dataFim: "",
    unidadeConsumidora: "",
    consumoMin: "",
    consumoMax: "",
  });

  const getLeads = async () => {
    try {
      const response = await api.get("/leads", { params: filters });
      setLeads(response.data);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFilters((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  useEffect(() => {
    getLeads();
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <div className="space-y-4">
      <Card>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <CardHeader>
              <AccordionTrigger>Filtros</AccordionTrigger>
            </CardHeader>
            <AccordionContent>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    name="nomeCompleto"
                    value={filters.nomeCompleto}
                    onChange={handleInputChange}
                    placeholder="Nome Completo"
                  />
                  <Input
                    name="email"
                    value={filters.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                  <Input
                    name="telefone"
                    value={filters.telefone}
                    onChange={handleInputChange}
                    placeholder="Telefone"
                  />
                  <div className="flex space-x-4">
                    <div style={{ width: "100%" }}>
                      <Label>Data Inicial</Label>
                      <Input
                        name="dataInicio"
                        type="date"
                        value={filters.dataInicio}
                        onChange={handleInputChange}
                        placeholder="Data Início"
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <Label>Data final</Label>
                      <Input
                        name="dataFim"
                        type="date"
                        value={filters.dataFim}
                        onChange={handleInputChange}
                        placeholder="Data Fim"
                      />
                    </div>
                  </div>
                  <Input
                    name="unidadeConsumidora"
                    value={filters.unidadeConsumidora}
                    onChange={handleInputChange}
                    placeholder="Código Unidade Consumidora"
                  />
                  <div className="flex space-x-4">
                    <Input
                      name="consumoMin"
                      value={filters.consumoMin}
                      onChange={handleInputChange}
                      placeholder="Consumo Mínimo"
                    />
                    <Input
                      name="consumoMax"
                      value={filters.consumoMax}
                      onChange={handleInputChange}
                      placeholder="Consumo Máximo"
                    />
                  </div>
                  <Button onClick={getLeads}>Filtrar</Button>
                </div>
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
      {loading ? (
        <Progress value={progress} />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        leads.map((lead) => (
          <Card key={lead.id} className="mb-4">
            <CardHeader>
              <CardTitle>Listagem das simulações registradas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <CardDescription>{lead.nomeCompleto}</CardDescription>
                <CardDescription>{lead.email}</CardDescription>

                <Tabs defaultValue="unidades">
                  <TabsList className="flex space-x-4" id="tabs">
                    <TabsTrigger value="unidades">Unidades</TabsTrigger>
                    <TabsTrigger value="historico">
                      Histórico de Consumo
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="unidades">
                    {lead.unidades.map((unidade: Unidade) => (
                      <Card key={unidade.id}>
                        <CardHeader>
                          <CardTitle>
                            Código {unidade.codigoDaUnidadeConsumidora}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            Modelo {unidade.modeloFasico}
                          </CardDescription>
                          <CardDescription>
                            Enquadramento {unidade.enquadramento}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent
                    value="historico"
                    className="space-y-4"
                    style={{ height: "50vh", overflowY: "scroll" }}
                  >
                    {lead.unidades.flatMap((unidade: Unidade) =>
                      unidade.historicoDeConsumoEmKWH.map(
                        (historico: Consumo) => (
                          <Card key={historico.id}>
                            <CardHeader>
                              <CardTitle>
                                {formatDate(historico.mesDoConsumo)}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              Consumo {historico.consumoForaPontaEmKWH} kWh
                            </CardContent>
                          </Card>
                        )
                      )
                    )}
                  </TabsContent>
                </Tabs>
              </div>
              <div className="mt-4">
                <PDFDownloadLink
                  document={<SimulacoesPDF leads={leads} />}
                  fileName="simulacoes_registradas.pdf"
                  >
                  {({ loading }) =>
                    loading ? (
                      <Button>Gerando PDF...</Button>
                    ) : (
                      <Button>Baixar PDF</Button>
                    )
                  }
                </PDFDownloadLink>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
