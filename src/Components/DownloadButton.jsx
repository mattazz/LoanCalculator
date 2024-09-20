import React from "react";
import PropTypes from "prop-types";
import * as XLSX from 'xlsx';

function DownloadButton({ data, fileName, interestRate }) {
    function handleDownload() {
        const monthlyInterestRate = interestRate / 12;
        const ws = XLSX.utils.aoa_to_sheet([
            ["Period", "Beginning Balance", "Payment", "Interest", "Principal", "Ending Balance"]
        ]);

        let remainingBalance = data[0].beginningBalance;

        data.forEach((row, index) => {
            const period = index + 1;
            const beginningBalanceCell = `B${period + 1}`;
            const paymentCell = `C${period + 1}`;
            const interestCell = `D${period + 1}`;
            const principalCell = `E${period + 1}`;
            const endingBalanceCell = `F${period + 1}`;
            const previousEndingBalanceCell = `F${period}`;

            ws[`A${period + 1}`] = { t: 'n', v: period };
            ws[beginningBalanceCell] = { t: 'n', v: period === 1 ? row.beginningBalance : undefined, f: period === 1 ? undefined : previousEndingBalanceCell };
            ws[interestCell] = { t: 'n', f: `ROUND(${beginningBalanceCell}*${monthlyInterestRate}, 2)` };
            ws[principalCell] = { t: 'n', f: `ROUND(${paymentCell}-${interestCell}, 2)` };

            if (period === data.length) {
                // Calculate the final payment to account for the remaining balance
                const finalInterest = remainingBalance * monthlyInterestRate;
                const finalPayment = remainingBalance + finalInterest;
                ws[paymentCell] = { t: 'n', v: finalPayment.toFixed(2) };
                ws[endingBalanceCell] = { t: 'n', v: 0 };
            } else {
                ws[endingBalanceCell] = { t: 'n', f: `ROUND(${beginningBalanceCell}-${principalCell}, 2)` };
                ws[paymentCell] = { t: 'n', v: row.payment };
            }

            // Update remaining balance for next iteration
            remainingBalance = period === data.length ? 0 : remainingBalance - (row.payment - (remainingBalance * monthlyInterestRate));
        });

        // Calculate the range of the worksheet
        const range = { s: { c: 0, r: 0 }, e: { c: 5, r: data.length } };
        ws['!ref'] = XLSX.utils.encode_range(range);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "LoanDetails");
        XLSX.writeFile(wb, fileName);
    }

    return (
        <div id="download-button-container">
        <button onClick={handleDownload}>Download as Excel</button>
        </div>
    );
}

DownloadButton.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    fileName: PropTypes.string.isRequired,
    interestRate: PropTypes.number.isRequired,
};

export default DownloadButton;