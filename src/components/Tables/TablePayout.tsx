import { Divider } from "antd";

const TablePayout = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-slate-200">
        <div className="w-full px-6 py-3">
          <h3 className="text-sm font-medium">Next payout</h3>
          <Divider />
          <h2 className="text-xl font-semibold">$4568.50</h2>
          <p className="text-xs font-light">via Payoneer</p>
          <Divider />
          <p className="text-xs">
            Your payout will be processed on April 15, 2020
          </p>
        </div>
      </div>
      <table className="w-full table-fixed bg-slate-200">
        <thead>
          <tr className="bg-stone-900 text-white">
            <th className="py-3 font-normal">Amount</th>
            <th className="py-3 font-normal">Payout Method</th>
            <th className="py-3 font-normal">Date Processed</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td>$2550.54</td>
            <td>Payoneer</td>
            <td>15 Mar 2020</td>
          </tr>
          <tr className="text-center">
            <td>$1950.14</td>
            <td>Payoneer</td>
            <td>15 Feb 2020</td>
          </tr>
        </tbody>
      </table>
      <div>
        <div className="w-full bg-slate-200 px-6 py-3">
          <h3 className="text-sm font-medium">Payout Account</h3>
          <Divider />
          <div>
            <img src="../../../public/image/ZaloPay_Logo.png" alt="" />
            <p>
              <span className="text-gray-500">Added: </span>01 Mar 2020
            </p>
          </div>
          <Divider />
          <button className="rounded-md bg-[#ff4d4f] px-4 py-3">
            Add Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePayout;
