import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Activity, Heart, Droplet, Scale, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FormData {
  pregnancies: string;
  glucose: string;
  bloodPressure: string;
  skinThickness: string;
  insulin: string;
  bmi: string;
  diabetesPedigree: string;
  age: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: "",
  });

  const [result, setResult] = useState<{
    prediction: "positive" | "negative" | null;
    message: string;
  }>({
    prediction: null,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (field: keyof FormData, value: number[]) => {
    setFormData((prev) => ({ ...prev, [field]: value[0].toString() }));
  };

  const fieldRanges = {
    pregnancies: { min: 0, max: 20, step: 1 },
    glucose: { min: 0, max: 300, step: 1 },
    bloodPressure: { min: 0, max: 200, step: 1 },
    skinThickness: { min: 0, max: 100, step: 1 },
    insulin: { min: 0, max: 500, step: 1 },
    bmi: { min: 10, max: 60, step: 0.1 },
    diabetesPedigree: { min: 0, max: 2.5, step: 0.001 },
    age: { min: 1, max: 120, step: 1 },
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof FormData)[] = [
      "pregnancies",
      "glucose",
      "bloodPressure",
      "skinThickness",
      "insulin",
      "bmi",
      "diabetesPedigree",
      "age",
    ];

    for (const field of requiredFields) {
      if (!formData[field] || isNaN(Number(formData[field]))) {
        toast({
          title: "Validation Error",
          description: `Please enter a valid number for ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handlePredict = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setResult({ prediction: null, message: "" });

    // Simulate API call
    setTimeout(() => {
      const glucose = Number(formData.glucose);
      const bmi = Number(formData.bmi);

      // Simple prediction logic
      if (glucose > 140 || bmi > 30) {
        setResult({
          prediction: "positive",
          message: "Based on your inputs, there may be an increased risk. Please consult a healthcare professional.",
        });
      } else {
        setResult({
          prediction: "negative",
          message: "Based on your inputs, your risk appears to be lower. Continue maintaining a healthy lifestyle!",
        });
      }

      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background py-8 px-4 sm:py-12">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Droplet className="w-10 h-10 text-primary" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Diabetes Prediction App
            </h1>
          </div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Enter your medical information below to get a simulated diabetes risk assessment
          </p>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-xl border-2 animate-scale-in">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Activity className="w-6 h-6 text-primary" />
              Medical Information
            </CardTitle>
            <CardDescription>
              Please fill in all fields with accurate medical data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="pregnancies" className="text-base font-medium flex items-center justify-between">
                  Pregnancies
                  <span className="text-sm text-primary font-semibold">{formData.pregnancies || "0"}</span>
                </Label>
                <Slider
                  value={[Number(formData.pregnancies) || 0]}
                  onValueChange={(value) => handleSliderChange("pregnancies", value)}
                  min={fieldRanges.pregnancies.min}
                  max={fieldRanges.pregnancies.max}
                  step={fieldRanges.pregnancies.step}
                  className="mb-2"
                />
                <Input
                  id="pregnancies"
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.pregnancies}
                  onChange={(e) => handleInputChange("pregnancies", e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="glucose" className="text-base font-medium flex items-center justify-between">
                  Glucose Level (mg/dL)
                  <span className="text-sm text-primary font-semibold">{formData.glucose || "0"}</span>
                </Label>
                <Slider
                  value={[Number(formData.glucose) || 0]}
                  onValueChange={(value) => handleSliderChange("glucose", value)}
                  min={fieldRanges.glucose.min}
                  max={fieldRanges.glucose.max}
                  step={fieldRanges.glucose.step}
                  className="mb-2"
                />
                <Input
                  id="glucose"
                  type="number"
                  placeholder="e.g., 120"
                  value={formData.glucose}
                  onChange={(e) => handleInputChange("glucose", e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="bloodPressure" className="text-base font-medium flex items-center justify-between">
                  Blood Pressure (mm Hg)
                  <span className="text-sm text-primary font-semibold">{formData.bloodPressure || "0"}</span>
                </Label>
                <Slider
                  value={[Number(formData.bloodPressure) || 0]}
                  onValueChange={(value) => handleSliderChange("bloodPressure", value)}
                  min={fieldRanges.bloodPressure.min}
                  max={fieldRanges.bloodPressure.max}
                  step={fieldRanges.bloodPressure.step}
                  className="mb-2"
                />
                <Input
                  id="bloodPressure"
                  type="number"
                  placeholder="e.g., 80"
                  value={formData.bloodPressure}
                  onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="skinThickness" className="text-base font-medium flex items-center justify-between">
                  Skin Thickness (mm)
                  <span className="text-sm text-primary font-semibold">{formData.skinThickness || "0"}</span>
                </Label>
                <Slider
                  value={[Number(formData.skinThickness) || 0]}
                  onValueChange={(value) => handleSliderChange("skinThickness", value)}
                  min={fieldRanges.skinThickness.min}
                  max={fieldRanges.skinThickness.max}
                  step={fieldRanges.skinThickness.step}
                  className="mb-2"
                />
                <Input
                  id="skinThickness"
                  type="number"
                  placeholder="e.g., 25"
                  value={formData.skinThickness}
                  onChange={(e) => handleInputChange("skinThickness", e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="insulin" className="text-base font-medium flex items-center justify-between">
                  Insulin Level (μU/mL)
                  <span className="text-sm text-primary font-semibold">{formData.insulin || "0"}</span>
                </Label>
                <Slider
                  value={[Number(formData.insulin) || 0]}
                  onValueChange={(value) => handleSliderChange("insulin", value)}
                  min={fieldRanges.insulin.min}
                  max={fieldRanges.insulin.max}
                  step={fieldRanges.insulin.step}
                  className="mb-2"
                />
                <Input
                  id="insulin"
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.insulin}
                  onChange={(e) => handleInputChange("insulin", e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="bmi" className="text-base font-medium flex items-center justify-between">
                  BMI (Body Mass Index)
                  <span className="text-sm text-primary font-semibold">{formData.bmi || "0"}</span>
                </Label>
                <Slider
                  value={[Number(formData.bmi) || 0]}
                  onValueChange={(value) => handleSliderChange("bmi", value)}
                  min={fieldRanges.bmi.min}
                  max={fieldRanges.bmi.max}
                  step={fieldRanges.bmi.step}
                  className="mb-2"
                />
                <Input
                  id="bmi"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 26.5"
                  value={formData.bmi}
                  onChange={(e) => handleInputChange("bmi", e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="diabetesPedigree" className="text-base font-medium flex items-center justify-between">
                  Diabetes Pedigree Function
                  <span className="text-sm text-primary font-semibold">{formData.diabetesPedigree || "0.000"}</span>
                </Label>
                <Slider
                  value={[Number(formData.diabetesPedigree) || 0]}
                  onValueChange={(value) => handleSliderChange("diabetesPedigree", value)}
                  min={fieldRanges.diabetesPedigree.min}
                  max={fieldRanges.diabetesPedigree.max}
                  step={fieldRanges.diabetesPedigree.step}
                  className="mb-2"
                />
                <Input
                  id="diabetesPedigree"
                  type="number"
                  step="0.001"
                  placeholder="e.g., 0.45"
                  value={formData.diabetesPedigree}
                  onChange={(e) => handleInputChange("diabetesPedigree", e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="age" className="text-base font-medium flex items-center justify-between">
                  Age (years)
                  <span className="text-sm text-primary font-semibold">{formData.age || "0"}</span>
                </Label>
                <Slider
                  value={[Number(formData.age) || 0]}
                  onValueChange={(value) => handleSliderChange("age", value)}
                  min={fieldRanges.age.min}
                  max={fieldRanges.age.max}
                  step={fieldRanges.age.step}
                  className="mb-2"
                />
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g., 32"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  className="h-12 text-base"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handlePredict}
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <>
                  <Activity className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 mr-2" />
                  Predict Diabetes 🧮
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Result Card */}
        {result.prediction && (
          <Card
            className={`mt-8 shadow-xl border-2 animate-fade-in ${
              result.prediction === "positive"
                ? "border-warning bg-warning/5"
                : "border-success bg-success/5"
            }`}
          >
            <CardContent className="pt-8 pb-8">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {result.prediction === "positive" ? (
                    <div className="w-20 h-20 rounded-full bg-warning/20 flex items-center justify-center">
                      <AlertCircle className="w-12 h-12 text-warning" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-success" />
                    </div>
                  )}
                </div>
                <h2
                  className={`text-2xl sm:text-3xl font-bold ${
                    result.prediction === "positive" ? "text-warning" : "text-success"
                  }`}
                >
                  {result.prediction === "positive"
                    ? "⚠️ Possibly Diabetic"
                    : "✅ Not Diabetic"}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                  {result.message}
                </p>
                <p className="text-sm text-muted-foreground italic">
                  This is a simulated result — connect ML backend later for accurate predictions.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-muted-foreground">
          <p className="text-sm sm:text-base">
            Built with ❤️ using <span className="font-semibold text-primary">Lovable AI</span>
          </p>
          <p className="text-xs mt-2">
            <Scale className="w-4 h-4 inline mr-1" />
            For educational purposes only. Always consult a healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
