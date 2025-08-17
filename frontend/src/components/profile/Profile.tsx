import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress,
  Stack
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Height as HeightIcon,
  MonitorWeight as WeightIcon,
  FitnessCenter as FitnessIcon,
  Cake as AgeIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

interface UserProfile {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  weight?: number;
  height?: number;
  fitnessGoal?: string;
  age?: number;
  profilePicture?: string;
}

const Profile = () => {
  const { isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    email: '',
    firstName: '',
    lastName: '',
    weight: 0,
    height: 0,
    fitnessGoal: '',
    age: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [originalProfile, setOriginalProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setProfile({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        weight: user.weight || 0,
        height: user.height || 0,
        fitnessGoal: user.fitnessGoal || '',
        age: user.age || 0,
        profilePicture: user.profilePicture || ''
      });
    }
  };



  const handleEdit = () => {
    setOriginalProfile({ ...profile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (originalProfile) {
      setProfile(originalProfile);
    }
    setIsEditing(false);
    setOriginalProfile(null);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token ? 'Token exists' : 'No token found');
      
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      console.log('Sending profile update request...');
      const response = await fetch('http://localhost:8080/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: profile.firstName,
          lastName: profile.lastName,
          weight: profile.weight,
          height: profile.height,
          fitnessGoal: profile.fitnessGoal,
          age: profile.age,
          profilePicture: profile.profilePicture
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to update profile: ${response.status} ${response.statusText}`);
      }

      const updatedUser = await response.json();
      console.log('Updated user data:', updatedUser);
      
      // Update localStorage with the updated user data
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUserData = {
        ...currentUser,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        weight: updatedUser.weight,
        height: updatedUser.height,
        fitnessGoal: updatedUser.fitnessGoal,
        age: updatedUser.age,
        profilePicture: updatedUser.profilePicture
      };
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      
      // Update the local state immediately so UI reflects changes
      setProfile({
        email: updatedUser.email || profile.email,
        firstName: updatedUser.firstName || profile.firstName,
        lastName: updatedUser.lastName || profile.lastName,
        weight: updatedUser.weight || profile.weight,
        height: updatedUser.height || profile.height,
        fitnessGoal: updatedUser.fitnessGoal || profile.fitnessGoal,
        age: updatedUser.age || profile.age,
        profilePicture: updatedUser.profilePicture || profile.profilePicture
      });
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
      setOriginalProfile(null);
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string | number) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getFitnessGoalColor = (goal: string) => {
    switch (goal) {
      case 'MUSCLE_GAIN': return 'primary';
      case 'WEIGHT_LOSS': return 'success';
      case 'ENDURANCE': return 'warning';
      case 'GENERAL_FITNESS': return 'info';
      default: return 'default';
    }
  };

  const getFitnessGoalLabel = (goal: string) => {
    switch (goal) {
      case 'MUSCLE_GAIN': return 'Muscle Gain';
      case 'WEIGHT_LOSS': return 'Weight Loss';
      case 'ENDURANCE': return 'Endurance';
      case 'GENERAL_FITNESS': return 'General Fitness';
      default: return goal;
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Please log in to view your profile.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {message && (
        <Alert 
          severity={message.type} 
          sx={{ mb: 2 }}
          onClose={() => setMessage(null)}
        >
          {message.text}
        </Alert>
      )}

      <Stack spacing={3}>
        {/* Profile Header */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Avatar
                sx={{ 
                  width: 80, 
                  height: 80, 
                  bgcolor: 'primary.main',
                  fontSize: '2rem'
                }}
              >
                {profile.firstName?.[0] || profile.email?.[0] || 'U'}
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {profile.email}
                </Typography>
                {profile.fitnessGoal && (
                  <Chip
                    label={getFitnessGoalLabel(profile.fitnessGoal)}
                    color={getFitnessGoalColor(profile.fitnessGoal) as any}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>
            </Box>
            <Box>
              {!isEditing ? (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  sx={{ borderRadius: 2 }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                    onClick={handleSave}
                    disabled={loading}
                    sx={{ borderRadius: 2 }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    sx={{ borderRadius: 2 }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Profile Details and Physical Stats */}
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Profile Details */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, flex: 2 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Personal Information
            </Typography>
            
            <Stack spacing={3}>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={profile.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={profile.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Box>
              
              <TextField
                fullWidth
                label="Email"
                value={profile.email}
                disabled
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
              
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={profile.age || ''}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <AgeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
                <TextField
                  fullWidth
                  label="Fitness Goal"
                  value={profile.fitnessGoal || ''}
                  onChange={(e) => handleInputChange('fitnessGoal', e.target.value)}
                  disabled={!isEditing}
                  select
                  InputProps={{
                    startAdornment: <FitnessIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                >
                  <option value="">Select Goal</option>
                  <option value="MUSCLE_GAIN">Muscle Gain</option>
                  <option value="WEIGHT_LOSS">Weight Loss</option>
                  <option value="ENDURANCE">Endurance</option>
                  <option value="GENERAL_FITNESS">General Fitness</option>
                </TextField>
              </Box>
            </Stack>
          </Paper>

          {/* Physical Stats */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3, flex: 1 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Physical Stats
            </Typography>
            
            <Stack spacing={3}>
              <Card variant="outlined">
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <WeightIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Weight
                    </Typography>
                    <TextField
                      size="small"
                      type="number"
                      value={profile.weight || ''}
                      onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                      disabled={!isEditing}
                      InputProps={{
                        endAdornment: <Typography variant="body2">kg</Typography>
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <HeightIcon color="primary" />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Height
                    </Typography>
                    <TextField
                      size="small"
                      type="number"
                      value={profile.height || ''}
                      onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                      disabled={!isEditing}
                      InputProps={{
                        endAdornment: <Typography variant="body2">cm</Typography>
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>

              {profile.weight && profile.height && (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      BMI
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {((profile.weight / Math.pow(profile.height / 100, 2)) || 0).toFixed(1)}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
};

export default Profile;
