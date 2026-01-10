import React from 'react';

interface PricingTableProps {
    pricingData: {
        itemCode: string;
        mrp: string;
        finish: string;
    }[];
}

const PricingTable: React.FC<PricingTableProps> = ({ pricingData }) => {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-3">
                <div className="text-center">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white md:text-sm">
                        Item Code
                    </h3>
                </div>
                <div className="text-center">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white md:text-sm">
                        MRP
                    </h3>
                </div>
                <div className="text-center">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white md:text-sm">
                        Finish
                    </h3>
                </div>
            </div>

            {/* Table Body */}
            <div className="max-h-[400px] overflow-y-auto">
                {pricingData.map((row, index) => (
                    <div
                        key={index}
                        className={`grid grid-cols-3 gap-4 px-4 py-3 ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                            } hover:bg-amber-50 transition-colors`}
                    >
                        <div className="text-center">
                            <p className="text-xs font-medium text-slate-900 md:text-sm">
                                {row.itemCode}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-semibold text-slate-900 md:text-sm">
                                {row.mrp}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-medium text-slate-600 md:text-sm">
                                {row.finish}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingTable;
