import { useState } from 'react';
import { Link } from "@remix-run/react";

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const toggleBillingPeriod = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly');
  };

  const plans = [
    {
      name: 'Basic',
      description: 'For individuals and small teams',
      monthlyPrice: 9,
      yearlyPrice: 99,
      features: [
        'Access to all articles',
        'Limited downloads',
        'Basic support',
      ],
    },
    {
      name: 'Pro',
      description: 'For growing teams and businesses',
      monthlyPrice: 19,
      yearlyPrice: 199,
      features: [
        'Unlimited article downloads',
        'Priority support',
        'Collaboration tools',
        'Analytics dashboard',
      ],
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: 49,
      yearlyPrice: 499,
      features: [
        'Dedicated account manager',
        'Custom integrations',
        'Advanced analytics',
        'Unlimited user seats',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <main className="container mx-auto px-4 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Pricing</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Choose the plan that best fits your needs and start your journey with TechWave today.
          </p>
        </section>

        {/* Billing Period Toggle */}
        <section className="mb-12 flex justify-center">
          <div className="bg-gray-900 rounded-lg p-4 flex items-center">
            <span
              className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
              }`}
              onClick={toggleBillingPeriod}
            >
              Monthly
            </span>
            <span
              className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                billingPeriod === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800'
              }`}
              onClick={toggleBillingPeriod}
            >
              Yearly
            </span>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-4">{plan.description}</p>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">
                  ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-gray-400 ml-2">
                  /{billingPeriod === 'monthly' ? 'month' : 'year'}
                </span>
              </div>
              <ul className="text-gray-400 space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <div className="flex justify-center">
                <Link
                  to={`/signup?plan=${plan.name.toLowerCase()}`}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-400 mb-8">
            Choose the plan that best fits your needs and start your journey with TechWave today.
          </p>
          <Link
            to="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up Now
          </Link>
        </section>
      </main>
    </div>
  );
};

export default PricingPage;