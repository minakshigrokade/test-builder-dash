import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Save, 
  Eye, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  text: string;
  type: 'true-false' | 'single' | 'multiple';
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswers: string[];
  image?: File;
}

interface ExamFormData {
  title: string;
  description: string;
  duration: number;
  questions: Question[];
}

const CreateExamManual = () => {
  const [examData, setExamData] = useState<ExamFormData>({
    title: '',
    description: '',
    duration: 60,
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    text: '',
    type: 'single',
    options: { A: '', B: '', C: '', D: '' },
    correctAnswers: []
  });

  const [showPreview, setShowPreview] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const { toast } = useToast();

  const resetCurrentQuestion = () => {
    setCurrentQuestion({
      text: '',
      type: 'single',
      options: { A: '', B: '', C: '', D: '' },
      correctAnswers: []
    });
  };

  const handleQuestionTypeChange = (type: 'true-false' | 'single' | 'multiple') => {
    setCurrentQuestion(prev => ({
      ...prev,
      type,
      correctAnswers: [],
      options: type === 'true-false' 
        ? { A: 'True', B: 'False', C: '', D: '' }
        : { A: '', B: '', C: '', D: '' }
    }));
  };

  const handleOptionChange = (option: 'A' | 'B' | 'C' | 'D', value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: {
        ...prev.options!,
        [option]: value
      }
    }));
  };

  const handleSingleAnswerChange = (answer: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      correctAnswers: [answer]
    }));
  };

  const handleMultipleAnswerChange = (answer: string, checked: boolean) => {
    setCurrentQuestion(prev => {
      const currentAnswers = prev.correctAnswers || [];
      if (checked) {
        return {
          ...prev,
          correctAnswers: [...currentAnswers, answer]
        };
      } else {
        return {
          ...prev,
          correctAnswers: currentAnswers.filter(a => a !== answer)
        };
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCurrentQuestion(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const validateCurrentQuestion = (): string[] => {
    const errors: string[] = [];
    
    if (!currentQuestion.text?.trim()) {
      errors.push('Question text is required');
    }

    if (currentQuestion.type !== 'true-false') {
      const options = currentQuestion.options!;
      if (!options.A?.trim() || !options.B?.trim()) {
        errors.push('At least options A and B are required');
      }
    }

    if (!currentQuestion.correctAnswers?.length) {
      errors.push('At least one correct answer must be selected');
    }

    return errors;
  };

  const addQuestion = () => {
    const errors = validateCurrentQuestion();
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      text: currentQuestion.text!,
      type: currentQuestion.type!,
      options: currentQuestion.options!,
      correctAnswers: currentQuestion.correctAnswers!,
      image: currentQuestion.image
    };

    setExamData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));

    resetCurrentQuestion();
    
    toast({
      title: "Question Added",
      description: `Question ${examData.questions.length + 1} has been added successfully.`,
    });
  };

  const removeQuestion = (id: string) => {
    setExamData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
    
    toast({
      title: "Question Removed",
      description: "Question has been removed from the exam.",
    });
  };

  const saveExam = () => {
    if (!examData.title.trim()) {
      toast({
        title: "Missing Exam Title",
        description: "Please enter an exam title before saving.",
        variant: "destructive"
      });
      return;
    }

    if (examData.questions.length === 0) {
      toast({
        title: "No Questions",
        description: "Please add at least one question before saving the exam.",
        variant: "destructive"
      });
      return;
    }

    // Mock save - in real app, this would be an API call
    toast({
      title: "Exam Saved Successfully",
      description: `"${examData.title}" has been saved with ${examData.questions.length} questions.`,
    });

    // Reset form
    setExamData({
      title: '',
      description: '',
      duration: 60,
      questions: []
    });
    resetCurrentQuestion();
    setSaveDialogOpen(false);
  };

  const getOptionLabel = (type: string, key: string) => {
    if (type === 'true-false') {
      return key === 'A' ? 'True' : key === 'B' ? 'False' : '';
    }
    return key;
  };

  return (
    <div className="space-y-6">
      {/* Exam Information */}
      <Card>
        <CardHeader>
          <CardTitle>Exam Information</CardTitle>
          <CardDescription>
            Set up the basic information for your exam
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="exam-title">Exam Title</Label>
              <Input
                id="exam-title"
                placeholder="Enter exam title"
                value={examData.title}
                onChange={(e) => setExamData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="60"
                value={examData.duration}
                onChange={(e) => setExamData(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Enter exam description"
              value={examData.description}
              onChange={(e) => setExamData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add Question */}
      <Card>
        <CardHeader>
          <CardTitle>Add Question</CardTitle>
          <CardDescription>
            Create a new question for your exam
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="question-text">Question Text</Label>
            <Textarea
              id="question-text"
              placeholder="Enter your question here..."
              value={currentQuestion.text || ''}
              onChange={(e) => setCurrentQuestion(prev => ({ ...prev, text: e.target.value }))}
              className="min-h-[100px]"
            />
          </div>

          {/* Question Image */}
          <div className="space-y-2">
            <Label htmlFor="question-image">Question Image (Optional)</Label>
            <div className="flex items-center gap-4">
              <input
                id="question-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('question-image')?.click()}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
              {currentQuestion.image && (
                <span className="text-sm text-muted-foreground">
                  {currentQuestion.image.name}
                </span>
              )}
            </div>
          </div>

          {/* Question Type */}
          <div className="space-y-2">
            <Label>Question Type</Label>
            <Select
              value={currentQuestion.type}
              onValueChange={handleQuestionTypeChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true-false">True/False</SelectItem>
                <SelectItem value="single">Single Choice</SelectItem>
                <SelectItem value="multiple">Multiple Choice</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <Label>Answer Options</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['A', 'B', 'C', 'D'].map((option) => {
                const shouldShow = currentQuestion.type === 'true-false' 
                  ? ['A', 'B'].includes(option)
                  : true;

                if (!shouldShow) return null;

                return (
                  <div key={option} className="space-y-2">
                    <Label htmlFor={`option-${option}`}>
                      Option {getOptionLabel(currentQuestion.type!, option)}
                    </Label>
                    <Input
                      id={`option-${option}`}
                      placeholder={
                        currentQuestion.type === 'true-false'
                          ? option === 'A' ? 'True' : 'False'
                          : `Enter option ${option}`
                      }
                      value={currentQuestion.options?.[option as keyof typeof currentQuestion.options] || ''}
                      onChange={(e) => handleOptionChange(option as 'A' | 'B' | 'C' | 'D', e.target.value)}
                      disabled={currentQuestion.type === 'true-false'}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Correct Answers */}
          <div className="space-y-4">
            <Label>Correct Answer(s)</Label>
            
            {currentQuestion.type === 'single' || currentQuestion.type === 'true-false' ? (
              <RadioGroup
                value={currentQuestion.correctAnswers?.[0] || ''}
                onValueChange={handleSingleAnswerChange}
              >
                {['A', 'B', 'C', 'D'].map((option) => {
                  const shouldShow = currentQuestion.type === 'true-false' 
                    ? ['A', 'B'].includes(option)
                    : currentQuestion.options?.[option as keyof typeof currentQuestion.options];

                  if (!shouldShow) return null;

                  return (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`correct-${option}`} />
                      <Label htmlFor={`correct-${option}`}>
                        {getOptionLabel(currentQuestion.type!, option)}: {currentQuestion.options?.[option as keyof typeof currentQuestion.options]}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            ) : (
              <div className="space-y-2">
                {['A', 'B', 'C', 'D'].map((option) => {
                  const optionText = currentQuestion.options?.[option as keyof typeof currentQuestion.options];
                  if (!optionText) return null;

                  return (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`correct-${option}`}
                        checked={currentQuestion.correctAnswers?.includes(option) || false}
                        onCheckedChange={(checked) => 
                          handleMultipleAnswerChange(option, checked as boolean)
                        }
                      />
                      <Label htmlFor={`correct-${option}`}>
                        {option}: {optionText}
                      </Label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Button onClick={addQuestion} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
        </CardContent>
      </Card>

      {/* Questions List */}
      {examData.questions.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Questions ({examData.questions.length})</CardTitle>
              <CardDescription>
                Review and manage your exam questions
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="mr-2 h-4 w-4" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {examData.questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Question {index + 1}</span>
                      <Badge variant="secondary" className="capitalize">
                        {question.type.replace('-', ' ')}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeQuestion(question.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="text-sm font-medium mb-2">{question.text}</p>
                  
                  {showPreview && (
                    <div className="space-y-2 text-sm">
                      {['A', 'B', 'C', 'D'].map((option) => {
                        const optionText = question.options[option as keyof typeof question.options];
                        if (!optionText) return null;

                        const isCorrect = question.correctAnswers.includes(option);
                        
                        return (
                          <div
                            key={option}
                            className={`p-2 rounded ${
                              isCorrect ? 'bg-success/10 text-success' : 'bg-muted/50'
                            }`}
                          >
                            {option}: {optionText}
                            {isCorrect && <CheckCircle className="inline ml-2 h-4 w-4" />}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="flex justify-end">
              <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary hover:opacity-90">
                    <Save className="mr-2 h-4 w-4" />
                    Save Exam
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Save Exam</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to save this exam? You can edit it later if needed.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="space-y-2">
                      <p><strong>Title:</strong> {examData.title}</p>
                      <p><strong>Duration:</strong> {examData.duration} minutes</p>
                      <p><strong>Questions:</strong> {examData.questions.length}</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={saveExam}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Save Exam
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreateExamManual;