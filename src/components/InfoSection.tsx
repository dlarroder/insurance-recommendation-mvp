import { Clock, Shield, TrendingUp, Users } from "lucide-react";

export default function InfoSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Comprehensive Coverage
        </h3>
        <p className="text-sm text-gray-600">
          Get coverage recommendations tailored to your specific needs and
          situation
        </p>
      </div>
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Smart Recommendations
        </h3>
        <p className="text-sm text-gray-600">
          Our algorithm considers your age, income, dependents, and risk
          tolerance
        </p>
      </div>
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Family Protection
        </h3>
        <p className="text-sm text-gray-600">
          Ensure your loved ones are financially protected with the right
          coverage
        </p>
      </div>
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-orange-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Quick Process
        </h3>
        <p className="text-sm text-gray-600">
          Get your personalized recommendation in minutes, not hours
        </p>
      </div>
    </div>
  );
}
