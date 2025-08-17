import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
  Card,
  CardContent,
  IconButton,
  Chip,
  Alert,
  CircularProgress
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
      // Here you would typically make an API call to update the profile
      // For now, we'll just update localStorage
      const updatedUser = { ...profile };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
      setOriginalProfile(null);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
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

      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
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
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Personal Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profile.email}
                  disabled
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Physical Stats */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Physical Stats
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
