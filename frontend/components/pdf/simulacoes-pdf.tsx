import { Consumo } from "@/app/interfaces/Consumo";
import { Lead } from "@/app/interfaces/Lead";
import { Unidade } from "@/app/interfaces/Unidade";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: "#f8fafc",  
    },
    section: {
      marginBottom: 25,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#2a2a2a',  
      marginBottom: 15,
    },
    subHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',  
      marginBottom: 8,
    },
    text: {
      fontSize: 14,
      color: '#666',  
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#2b2b2b',
      marginBottom: 10,
      paddingBottom: 6,
      borderBottom: '2px solid #e0e0e0',  
    },
    listItem: {
      fontSize: 14,
      color: '#555',
      marginLeft: 20,
      marginBottom: 5,  
    },
    container: {
      padding: 20,
      backgroundColor: "#ffffff",
      borderRadius: 10,
      border: '1px solid #dcdcdc',  
      marginBottom: 25,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  
    },
    contentBlock: {
      marginBottom: 20,  
    },
    contentTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#444',
      marginBottom: 6,
    },
  });

export const SimulacoesPDF = ({ leads }: { leads: Lead[] }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Simulações Registradas</Text>

      {leads.map((lead) => (
        <View key={lead.id} style={styles.container}>
          <Text style={styles.subHeader}>{lead.nomeCompleto}</Text>
          <Text style={styles.text}>Email: {lead.email}</Text>
          <Text style={styles.text}>Telefone: {lead.telefone}</Text>

          <Text style={styles.sectionTitle}>Data de Criação</Text>
          <Text style={styles.text}>{new Date(lead.createdAt).toLocaleDateString()}</Text>

          {lead.unidades.map((unidade: Unidade) => (
            <View key={unidade.id} style={styles.section}>
              <Text style={styles.sectionTitle}>Unidade: {unidade.codigoDaUnidadeConsumidora}</Text>
              <Text style={styles.text}>Modelo: {unidade.modeloFasico}</Text>
              <Text style={styles.text}>Enquadramento: {unidade.enquadramento}</Text>

              {unidade.historicoDeConsumoEmKWH.map((historico: Consumo) => (
                <View key={historico.id} style={styles.section}>
                  <Text style={styles.listItem}>
                    Consumo de {new Date(historico.mesDoConsumo).toLocaleDateString()} | {new Date(historico.consumoForaPontaEmKWH).toLocaleDateString()} kWh
                  </Text>
                  <Text style={styles.listItem}>
                    Consumo Ponta: {historico.consumoForaPontaEmKWH} kWh
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);
