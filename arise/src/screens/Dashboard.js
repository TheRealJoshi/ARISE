import React from 'react';

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            records: [
                {recordID: 1, patientName: 'John Doe', diagnosis: 'Flu'},
                {recordID: 2, patientName: 'Jane Doe', diagnosis: 'Cold'}, 
                //Add more records as needed
            ]
        };
    }

    render() {
        return (
            <div>
                <h1>Medical Dashboard</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Record ID</th>
                            <th>Patient Name</th>
                            <th>Diagnosis</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.records.map((record) => 
                            <tr key={record.recordID}>
                                <td>{record.recordID}</td>
                                <td>{record.patientName}</td>
                                <td>{record.diagnosis}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Dashboard;