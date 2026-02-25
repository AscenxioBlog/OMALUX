import React from 'react';

const faqs = [
  {
    question: 'When is payment collected?',
    answer: 'Payment is collected when you confirm the pre-order request.',
  },
  {
    question: 'Can I change my selected batch later?',
    answer: 'Yes. You can request a batch change before your order enters production.',
  },
  {
    question: 'Will I receive status updates?',
    answer: 'Yes. We send email updates at confirmation, production start, and shipping.',
  },
];

function PreOrderFAQ() {
  return (
    <section className="bg-gray-50 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-900">Pre-Order FAQs</h2>
      <div className="mt-4 space-y-4">
        {faqs.map((faq) => (
          <article key={faq.question} className="bg-white rounded-xl p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PreOrderFAQ;
