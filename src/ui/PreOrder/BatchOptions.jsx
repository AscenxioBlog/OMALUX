import React from 'react';

const batches = [
  {
    id: 'batch-1',
    title: 'Batch 1',
    deliveryWindow: 'Ships in 2-3 weeks',
    slots: '12 slots left',
    priceNote: 'Early access pricing',
  },
  {
    id: 'batch-2',
    title: 'Batch 2',
    deliveryWindow: 'Ships in 4-5 weeks',
    slots: '28 slots left',
    priceNote: 'Standard pre-order pricing',
  },
  {
    id: 'batch-3',
    title: 'Batch 3',
    deliveryWindow: 'Ships in 6-8 weeks',
    slots: 'Open enrollment',
    priceNote: 'Best for non-urgent orders',
  },
];

function BatchOptions() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Batch</h2>
        <p className="text-gray-600">Pick the shipping timeline that fits your need.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {batches.map((batch) => (
          <article key={batch.id} className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">{batch.title}</h3>
            <p className="mt-2 text-gray-600">{batch.deliveryWindow}</p>
            <p className="mt-1 text-gray-700 font-medium">{batch.slots}</p>
            <p className="mt-3 inline-block px-3 py-1 text-xs rounded-full bg-pink-100 text-[#FF496C]">
              {batch.priceNote}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BatchOptions;
