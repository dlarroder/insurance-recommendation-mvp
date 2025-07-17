'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RecommendationResult } from '@/lib/recommendation-engine';

const formSchema = z.object({
  age: z.number().min(18, 'Age must be at least 18').max(100, 'Age must be 100 or less'),
  income: z.number().min(1, 'Income must be greater than 0').max(10000000, 'Income must be reasonable'),
  dependents: z.number().min(0, 'Dependents cannot be negative').max(20, 'Dependents must be 20 or less'),
  riskTolerance: z.enum(['low', 'medium', 'high'], {
    message: 'Please select your risk tolerance',
  }),
});

type FormData = z.infer<typeof formSchema>;

interface InsuranceFormProps {
  onRecommendation: (recommendation: RecommendationResult) => void;
}

export function InsuranceForm({ onRecommendation }: InsuranceFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendation');
      }

      const result = await response.json();
      onRecommendation(result.recommendation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const riskToleranceValue = watch('riskTolerance');

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Get Your Personalized Life Insurance Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              {...register('age', { valueAsNumber: true })}
            />
            {errors.age && (
              <p className="text-sm text-red-500">{errors.age.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="income">Annual Income</Label>
            <Input
              id="income"
              type="number"
              placeholder="Enter your annual income"
              {...register('income', { valueAsNumber: true })}
            />
            {errors.income && (
              <p className="text-sm text-red-500">{errors.income.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dependents">Number of Dependents</Label>
            <Input
              id="dependents"
              type="number"
              placeholder="Enter number of dependents"
              {...register('dependents', { valueAsNumber: true })}
            />
            {errors.dependents && (
              <p className="text-sm text-red-500">{errors.dependents.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="riskTolerance">Risk Tolerance</Label>
            <Select
              value={riskToleranceValue}
              onValueChange={(value) => setValue('riskTolerance', value as 'low' | 'medium' | 'high')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your risk tolerance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - I prefer stable, predictable investments</SelectItem>
                <SelectItem value="medium">Medium - I can handle some market fluctuations</SelectItem>
                <SelectItem value="high">High - I&apos;m comfortable with investment risks</SelectItem>
              </SelectContent>
            </Select>
            {errors.riskTolerance && (
              <p className="text-sm text-red-500">{errors.riskTolerance.message}</p>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Generating Recommendation...' : 'Get My Recommendation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}