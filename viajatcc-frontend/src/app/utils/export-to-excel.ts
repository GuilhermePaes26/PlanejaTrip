import ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

interface Passenger {
  _id: string;
  nome: string;
  email: string;
  cpf: string;
  idade?: number;
}

export async function exportPassengersToExcel(
  passengers: Passenger[],
  tripName: string,
  tripPrice: number
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Relatório de Passageiros');

  worksheet.mergeCells('A1:E1');
  worksheet.getCell('A1').value = `Relatório da Viagem: ${tripName}`;
  worksheet.getCell('A1').font = { size: 16, bold: true };
  worksheet.getCell('A1').alignment = { horizontal: 'center' };

  worksheet.mergeCells('A2:E2');
  worksheet.getCell('A2').value = `Preço individual: R$ ${tripPrice.toFixed(
    2
  )}  •  Total arrecadado: R$ ${(tripPrice * passengers.length).toFixed(2)}`;
  worksheet.getCell('A2').font = { size: 12, italic: true };
  worksheet.getCell('A2').alignment = { horizontal: 'center' };

  worksheet.addRow([]);

  const headerRow = worksheet.addRow(['ID', 'Nome', 'Email', 'CPF', 'Idade']);

  worksheet.getColumn(1).width = 40;
  worksheet.getColumn(2).width = 25;
  worksheet.getColumn(3).width = 35;
  worksheet.getColumn(4).width = 25;
  worksheet.getColumn(5).width = 10;

  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF2ECC71' },
    };
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.alignment = { horizontal: 'center' };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  passengers.forEach((p) => {
    worksheet.addRow([p._id, p.nome, p.email, p.cpf, p.idade ?? '']);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  FileSaver.saveAs(blob, `${tripName}-relatorio.xlsx`);
}
