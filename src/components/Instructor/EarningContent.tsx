import React, { useState } from 'react';
import { Button, message } from 'antd';
import '../../styles/instructorEarning.css';

const EarningContent: React.FC = () => {
  const [earnings, setEarnings] = useState(1146.78);
  const [balance, setBalance] = useState(1146.78);
  const [totalSales, setTotalSales] = useState(95895.54);

  const handlePayout = () => {
    if (balance < 50) {
      message.error('Minimum payout requirement not met. Minimum is $50.');
    } else {
      // Code to send an email to the instructor
      message.success('Payout request sent. You will receive an email shortly.');
      // Assuming there's an API call to handle the email sending
      // Example: sendPayoutRequest(instructorEmail);
    }
  };

  return (
    <div className="earning-content">
      <h2>Earning</h2>
      <div className="earnings-summary">
        <div className="summary-item">
          <p>Sales earnings this month (April), after edututs+ fees, & before taxes:</p>
          <h3>${earnings.toFixed(2)}</h3>
        </div>
        <div className="summary-item">
          <p>Your balance:</p>
          <h3>${balance.toFixed(2)}</h3>
        </div>
        <div className="summary-item">
          <p>Total value of your sales, before taxes:</p>
          <h3>${totalSales.toFixed(2)}</h3>
        </div>
      </div>
      <div className="top-countries">
        <h3>Your Top Countries</h3>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Earning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>United States</td>
              <td>$48</td>
            </tr>
            <tr>
              <td>Bulgaria</td>
              <td>$35</td>
            </tr>
            <tr>
              <td>Dominica</td>
              <td>$25</td>
            </tr>
            <tr>
              <td>Italy</td>
              <td>$18</td>
            </tr>
            <tr>
              <td>Korea, Republic of</td>
              <td>$18</td>
            </tr>
            <tr>
              <td>Malaysia</td>
              <td>$10</td>
            </tr>
            <tr>
              <td>Netherlands</td>
              <td>$8</td>
            </tr>
            <tr>
              <td>Thailand</td>
              <td>$5</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="sales-table">
        <h3>Item Sales</h3>
        <div className="table-controls">
          <select>
            <option value="all-time">All Time</option>
            <option value="2020">2020</option>
            <option value="april">April</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Item Sales Count</th>
              <th>Earning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1, Wednesday</td>
              <td>3</td>
              <td>$120.50</td>
            </tr>
            <tr>
              <td>2, Thursday</td>
              <td>2</td>
              <td>$84.00</td>
            </tr>
            <tr>
              <td>4, Saturday</td>
              <td>4</td>
              <td>$150.50</td>
            </tr>
            <tr>
              <td>5, Sunday</td>
              <td>3</td>
              <td>$102.24</td>
            </tr>
            <tr>
              <td>6, Monday</td>
              <td>2</td>
              <td>$80.50</td>
            </tr>
            <tr>
              <td>7, Tuesday</td>
              <td>1</td>
              <td>$70.50</td>
            </tr>
            <tr>
              <td>8, Wednesday</td>
              <td>5</td>
              <td>$130.00</td>
            </tr>
            <tr>
              <td>9, Thursday</td>
              <td>3</td>
              <td>$95.50</td>
            </tr>
            <tr>
              <td>10, Friday</td>
              <td>4</td>
              <td>$152.50</td>
            </tr>
            <tr>
              <td>11, Saturday</td>
              <td>3</td>
              <td>$100.40</td>
            </tr>
            <tr>
              <td>12, Sunday</td>
              <td>2</td>
              <td>$60.14</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td>Total</td>
              <td>34</td>
              <td>${earnings.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Button type="primary" onClick={handlePayout} style={{ marginTop: '20px' }}>
        Payout
      </Button>
    </div>
  );
};

export default EarningContent;
