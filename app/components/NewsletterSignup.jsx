export default function NewsletterSignup() {
    return (
      <div className="my-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Subscribe to our newsletter for daily industry insights</h3>
        <div className="flex justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-l-lg border-none focus:ring-0"
          />
          <button className="px-4 py-3 bg-blue-600 text-white rounded-r-lg">
            Start Free Trial
          </button>
        </div>
      </div>
    );
  }
  