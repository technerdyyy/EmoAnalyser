import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Loader2, Heart, Brain } from "lucide-react";
import { useToast } from "../hooks/use-toast";

interface EmotionResult {
  emotion: string;
  confidence: number;
}

const Index = () => {
  const [reflection, setReflection] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EmotionResult | null>(null);
  const { toast } = useToast();

// Api Call
  const analyzeEmotion = async (text: string): Promise<EmotionResult> => {
    const response = await fetch("http://localhost:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
  
    if (!response.ok) throw new Error("Failed to analyze");
  
    return await response.json();
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reflection.trim()) {
      toast({
        title: "Please enter your reflection",
        description: "We need some text to analyze your emotions.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
     
      
      const data = await analyzeEmotion(reflection);
      setResult(data);
      
      toast({
        title: "Analysis complete!",
        description: "Your emotion reflection has been processed.",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Sorry, we couldn't analyze your reflection. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getEmotionColor = (emotion: string) => {
    const colorMap: Record<string, string> = {
      "Anxious": "text-orange-600",
      "Excited": "text-yellow-600", 
      "Calm": "text-blue-600",
      "Worried": "text-red-600",
      "Hopeful": "text-green-600",
      "Confident": "text-purple-600",
      "Nervous": "text-orange-500",
      "Happy": "text-pink-600"
    };
    return colorMap[emotion] || "text-foreground";
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-primary" />
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">EmoAnalyser</h1>
          <p className="text-muted-foreground">Share your thoughts and discover your emotions</p>
        </div>

        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How are you feeling?</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reflection">Your reflection</Label>
                <Textarea
                  id="reflection"
                  placeholder="e.g., I feel nervous about my first job interview..."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="min-h-[120px] resize-none"
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !reflection.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Emotion"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Your Emotion Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getEmotionColor(result.emotion)}`}>
                  {result.emotion}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Confidence: {(result.confidence * 100).toFixed(0)}%
                </div>
              </div>
              
              {/* Confidence Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Confidence Level</span>
                  <span>{(result.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
              </div>

              <Button 
                variant="outline" 
                onClick={() => {
                  setResult(null);
                  setReflection("");
                }}
                className="w-full"
              >
                New Reflection
              </Button>
            </CardContent>
          </Card>
        )}

        {/* API Integration Note */}
        
      </div>
    </div>
  );
};

export default Index;
