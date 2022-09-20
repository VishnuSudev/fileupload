import React from 'react'
import { IndividualData } from './IndividualData'

export const Data = ({excelData}) => {
    return excelData.map((individualExcelData)=>(
        <tr key={individualExcelData.RollNo}>
            <IndividualData individualExcelData={individualExcelData}/>
        </tr>        
    ))
}
