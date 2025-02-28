"use client"
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import api from "../api/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function Simular() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    file: null as File | null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  const formSchema = z.object({
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    telefone: z.string().min(10, "O telefone deve ter pelo menos 10 caracteres"),
    file: z.instanceof(File).optional(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = formSchema.safeParse(form);
    if (!result.success) {
      const newErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("nome", form.nome);
    formData.append("email", form.email);
    formData.append("telefone", form.telefone);
    if (form.file) {
      formData.append("file", form.file);
    }

    try {
       await api.post("/leads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success('Simulação enviada com sucesso!')
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)      toast.error(error?.response?.data?.error?.details)
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar nova simulação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              placeholder="Digite seu nome"
              onChange={handleChange}
            />
            {errors.nome && <p className="text-red-500">{errors.nome}</p>}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              type="phone"
              placeholder="Digite seu telefone"
              onChange={handleChange}
            />
            {errors.telefone && <p className="text-red-500">{errors.telefone}</p>}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="file">Insira sua conta de energia</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf,.jpg,.png"
              multiple
              onChange={handleChange}
            />
            {errors.file && <p className="text-red-500">{errors.file}</p>}
          </div>
          <Button type="submit">Simular</Button>
        </form>
      </CardContent>
    </Card>
  );
}
