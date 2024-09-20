import React from "react";
import PropTypes from "prop-types";
import * as XLSX from 'xlsx'

function DownloadButton({ data, fileName }) {
    console.log(`DOWNLOAD BUTTON DATA INFO: ${JSON.stringify(data)}` );

    function handleDownload() {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "LoanDetails");
        XLSX.writeFile(wb, fileName)
    }

    return (
        <button onClick={handleDownload}> Download as Excel</button>
    )
}

DownloadButton.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    fileName: PropTypes.string.isRequired,
};

export default DownloadButton