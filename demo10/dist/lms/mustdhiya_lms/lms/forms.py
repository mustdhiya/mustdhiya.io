from django import forms
from .models import Course, ClassSession, Discussion, Grade, Certificate

class CourseForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ['title', 'description']

class ClassSessionForm(forms.ModelForm):
    class Meta:
        model = ClassSession
        fields = ['title', 'description', 'date']

class DiscussionForm(forms.ModelForm):
    class Meta:
        model = Discussion
        fields = ['message']

class GradeForm(forms.ModelForm):
    class Meta:
        model = Grade
        fields = ['score', 'feedback']

class CertificateForm(forms.ModelForm):
    class Meta:
        model = Certificate
        fields = ['student', 'course']
