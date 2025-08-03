import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Upload, FileSpreadsheet, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  question: string;
  type: 'true-false' | 'single' | 'multiple';
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswers: string;
}

const CreateExamCSV = () => {
  const [examTitle, setExamTitle] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

  const sampleCSV = `question,type,optionA,optionB,optionC,optionD,correctAnswers
"Is the sky blue?",true-false,True,False,,,A
"Which of these are fruits?",multiple,Apple,Car,Orange,Train,A|C
"What is the capital of India?",single,Mumbai,Delhi,Kolkata,Chennai,B
"Which programming language is this course about?",single,Python,JavaScript,Java,C++,B
"Select all even numbers:",multiple,2,3,4,5,A|C`;

  const downloadSampleCSV = () => {
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exam_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast({
      title: "Sample Downloaded",
      description: "CSV template has been downloaded successfully.",
    });
  };

  const validateCSV = (data: any[]): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const requiredFields = ['question', 'type', 'optionA', 'optionB', 'correctAnswers'];

    data.forEach((row, index) => {
      const rowNum = index + 2; // +2 because index starts at 0 and we have header row

      // Check required fields
      requiredFields.forEach(field => {
        if (!row[field] || row[field].trim() === '') {
          errors.push(`Row ${rowNum}: Missing ${field}`);
        }
      });

      // Validate question type
      if (row.type && !['true-false', 'single', 'multiple'].includes(row.type)) {
        errors.push(`Row ${rowNum}: Invalid question type "${row.type}". Must be true-false, single, or multiple`);
      }

      // Validate correct answers format
      if (row.correctAnswers) {
        const answers = row.correctAnswers.split('|');
        const validAnswers = ['A', 'B', 'C', 'D'];
        
        answers.forEach(answer => {
          if (!validAnswers.includes(answer.trim())) {
            errors.push(`Row ${rowNum}: Invalid answer "${answer}". Must be A, B, C, or D`);
          }
        });

        // For true-false, only A or B allowed
        if (row.type === 'true-false' && answers.length > 1) {
          errors.push(`Row ${rowNum}: True-false questions can only have one correct answer`);
        }

        // For single choice, only one answer allowed
        if (row.type === 'single' && answers.length > 1) {
          errors.push(`Row ${rowNum}: Single choice questions can only have one correct answer`);
        }
      }
    });

    return { valid: errors.length === 0, errors };
  };

  const parseCSV = (text: string): Question[] => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = [];
      let current = '';
      let inQuotes = false;

      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      data.push(row);
    }

    const validation = validateCSV(data);
    setErrors(validation.errors);

    if (validation.valid) {
      return data.map(row => ({
        question: row.question,
        type: row.type as 'true-false' | 'single' | 'multiple',
        optionA: row.optionA || '',
        optionB: row.optionB || '',
        optionC: row.optionC || '',
        optionD: row.optionD || '',
        correctAnswers: row.correctAnswers
      }));
    }

    return [];
  };

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsedQuestions = parseCSV(text);
      setQuestions(parsedQuestions);
      
      if (parsedQuestions.length > 0) {
        toast({
          title: "CSV Uploaded Successfully",
          description: `${parsedQuestions.length} questions loaded from ${file.name}`,
        });
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        handleFileUpload(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a CSV file.",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const saveExam = () => {
    if (!examTitle.trim()) {
      toast({
        title: "Missing Exam Title",
        description: "Please enter an exam title before saving.",
        variant: "destructive"
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "No Questions",
        description: "Please upload questions before saving the exam.",
        variant: "destructive"
      });
      return;
    }

    // Mock save - in real app, this would be an API call
    toast({
      title: "Exam Saved Successfully",
      description: `"${examTitle}" has been saved with ${questions.length} questions.`,
    });

    // Reset form
    setExamTitle('');
    setQuestions([]);
    setErrors([]);
    setFileName('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Create Exam from CSV
          </CardTitle>
          <CardDescription>
            Upload a CSV file containing your exam questions or download our template to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Exam Title */}
          <div className="space-y-2">
            <Label htmlFor="exam-title">Exam Title</Label>
            <Input
              id="exam-title"
              placeholder="Enter exam title (e.g., 'Advanced Mathematics - Final Exam')"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              className="h-12"
            />
          </div>

          {/* Download Template */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <h4 className="font-medium">Need a template?</h4>
              <p className="text-sm text-muted-foreground">
                Download our CSV template with sample questions to get started quickly.
              </p>
            </div>
            <Button onClick={downloadSampleCSV} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Template
            </Button>
          </div>

          {/* File Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 transition-colors ${
              dragActive
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Upload CSV File</h3>
                <p className="text-sm text-muted-foreground">
                  Drag and drop your CSV file here, or click to browse
                </p>
              </div>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            {fileName && (
              <div className="mt-4 p-3 bg-success/10 rounded-lg flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Uploaded: {fileName}</span>
              </div>
            )}
          </div>

          {/* Validation Errors */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="font-medium mb-2">CSV Validation Errors:</div>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Questions Preview */}
      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Questions Preview ({questions.length} questions)</CardTitle>
            <CardDescription>
              Review your uploaded questions before saving the exam.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Options</TableHead>
                    <TableHead>Correct</TableHead>
                    <TableHead className="w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.map((question, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate" title={question.question}>
                          {question.question}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">{question.type.replace('-', ' ')}</span>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          {question.optionA && <div>A: {question.optionA}</div>}
                          {question.optionB && <div>B: {question.optionB}</div>}
                          {question.optionC && <div>C: {question.optionC}</div>}
                          {question.optionD && <div>D: {question.optionD}</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-success">
                          {question.correctAnswers}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeQuestion(index)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={saveExam}
                className="bg-gradient-primary hover:opacity-90"
                size="lg"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Save Exam
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CreateExamCSV;