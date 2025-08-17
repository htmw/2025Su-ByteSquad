import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Switch,
  Button,
  TextField,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Stack
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    workoutReminders: boolean;
    supplementReminders: boolean;
  };
  privacy: {
    profileVisibility: boolean;
    shareProgress: boolean;
    allowMessages: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    units: 'metric' | 'imperial';
  };
}

const Settings = () => {
  const { isAuthenticated, logout } = useAuth();
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      push: true,
      workoutReminders: true,
      supplementReminders: false
    },
    privacy: {
      profileVisibility: true,
      shareProgress: false,
      allowMessages: true
    },
    preferences: {
      theme: 'light',
      language: 'English',
      units: 'metric'
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleSettingChange = (category: keyof Settings, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Here you would typically make an API call to save settings
      // For now, we'll just save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    console.log('🔄 Password change initiated...');
    console.log('📝 Password data:', { 
      currentPassword: passwordData.currentPassword ? '***' : 'empty',
      newPassword: passwordData.newPassword ? '***' : 'empty',
      confirmPassword: passwordData.confirmPassword ? '***' : 'empty'
    });

    // Clear any previous messages
    setMessage(null);

    // Validate current password is provided
    if (!passwordData.currentPassword.trim()) {
      const errorMsg = 'Please enter your current password';
      console.error('❌ Validation failed:', errorMsg);
      setMessage({ type: 'error', text: errorMsg });
      return;
    }

    // Validate new password is provided
    if (!passwordData.newPassword.trim()) {
      const errorMsg = 'Please enter a new password';
      console.error('❌ Validation failed:', errorMsg);
      setMessage({ type: 'error', text: errorMsg });
      return;
    }

    // Validate confirm password is provided
    if (!passwordData.confirmPassword.trim()) {
      const errorMsg = 'Please confirm your new password';
      console.error('❌ Validation failed:', errorMsg);
      setMessage({ type: 'error', text: errorMsg });
      return;
    }

    // Check if new password is different from current
    if (passwordData.currentPassword === passwordData.newPassword) {
      const errorMsg = 'New password must be different from current password';
      console.error('❌ Validation failed:', errorMsg);
      setMessage({ type: 'error', text: errorMsg });
      return;
    }

    // Check if passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      const errorMsg = 'New passwords do not match!';
      console.error('❌ Validation failed:', errorMsg);
      setMessage({ type: 'error', text: errorMsg });
      return;
    }

    // Validate password length
    if (passwordData.newPassword.length < 6) {
      const errorMsg = 'Password must be at least 6 characters long!';
      console.error('❌ Validation failed:', errorMsg);
      setMessage({ type: 'error', text: errorMsg });
      return;
    }

    console.log('✅ All validations passed, making API call...');
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('🔑 Token found, sending request to backend...');
      const response = await fetch('http://localhost:8080/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      console.log('📡 Response received:', { status: response.status, ok: response.ok });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Backend error:', errorText);
        
        // Handle specific backend error messages
        if (errorText.includes("Current password is incorrect")) {
          throw new Error('Current password is incorrect. Please try again.');
        } else if (errorText.includes("User not found")) {
          throw new Error('User session expired. Please log in again.');
        } else {
          throw new Error(`Password change failed: ${errorText}`);
        }
      }

      // Success! Clear form and show success message
      console.log('✅ Password changed successfully!');
      setMessage({ type: 'success', text: 'Password changed successfully! You can now use your new password to log in.' });
      setShowPasswordDialog(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      
    } catch (error) {
      console.error('❌ Password change error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while changing password';
      setMessage({ type: 'error', text: errorMessage });
      
      // Auto-hide error message after 8 seconds
      setTimeout(() => {
        setMessage(null);
      }, 8000);
    } finally {
      setLoading(false);
      console.log('🔄 Password change process completed');
    }
  };

  const handleClosePasswordDialog = () => {
    console.log('🔒 Closing password change dialog...');
    setShowPasswordDialog(false);
    setPasswordData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    setMessage(null);
  };

  const handleCloseDeleteDialog = () => {
    console.log('🔒 Closing delete account dialog...');
    setShowDeleteDialog(false);
    setMessage(null);
  };

  const handleDeleteAccount = async () => {
    console.log('🗑️ Account deletion initiated...');
    
    // Clear any previous messages
    setMessage(null);

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('🔑 Token found, sending delete request to backend...');
      const response = await fetch('http://localhost:8080/api/auth/delete-account', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('📡 Delete response received:', { status: response.status, ok: response.ok });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Backend error during deletion:', errorText);
        
        // Handle specific backend error messages
        if (errorText.includes("User not found")) {
          throw new Error('User session expired. Please log in again.');
        } else {
          throw new Error(`Account deletion failed: ${errorText}`);
        }
      }

      // Success! Show confirmation message before redirecting
      console.log('✅ Account deleted successfully!');
      setMessage({ type: 'success', text: 'Account deleted successfully. Redirecting to login...' });
      
      // Clear local storage and redirect to login after a short delay
      setTimeout(() => {
        localStorage.clear();
        window.location.href = '/login';
      }, 2000);
      
    } catch (error) {
      console.error('❌ Account deletion error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred while deleting account';
      setMessage({ type: 'error', text: errorMessage });
      
      // Auto-hide error message after 8 seconds
      setTimeout(() => {
        setMessage(null);
      }, 8000);
    } finally {
      setLoading(false);
      console.log('🔄 Account deletion process completed');
    }
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Please log in to access settings.</Alert>
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

      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        Settings
      </Typography>

      <Stack spacing={3}>
        {/* Notifications Settings */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <NotificationsIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Notifications
            </Typography>
          </Box>
          
          <List>
            <ListItem>
              <ListItemText 
                primary="Email Notifications"
                secondary="Receive updates via email"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.notifications.email}
                  onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <ListItem>
              <ListItemText 
                primary="Push Notifications"
                secondary="Receive push notifications"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.notifications.push}
                  onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <ListItem>
              <ListItemText 
                primary="Workout Reminders"
                secondary="Get reminded about scheduled workouts"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.notifications.workoutReminders}
                  onChange={(e) => handleSettingChange('notifications', 'workoutReminders', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <ListItem>
              <ListItemText 
                primary="Supplement Reminders"
                secondary="Get reminded about supplement intake"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.notifications.supplementReminders}
                  onChange={(e) => handleSettingChange('notifications', 'supplementReminders', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>

        {/* Privacy Settings */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SecurityIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Privacy
            </Typography>
          </Box>
          
          <List>
            <ListItem>
              <ListItemText 
                primary="Profile Visibility"
                secondary="Allow others to see your profile"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.privacy.profileVisibility}
                  onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <ListItem>
              <ListItemText 
                primary="Share Progress"
                secondary="Share your fitness progress publicly"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.privacy.shareProgress}
                  onChange={(e) => handleSettingChange('privacy', 'shareProgress', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
            
            <ListItem>
              <ListItemText 
                primary="Allow Messages"
                secondary="Allow other users to message you"
              />
              <ListItemSecondaryAction>
                <Switch
                  checked={settings.privacy.allowMessages}
                  onChange={(e) => handleSettingChange('privacy', 'allowMessages', e.target.checked)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>

        {/* Preferences */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PaletteIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Preferences
            </Typography>
          </Box>
          
          <Stack spacing={2}>
            <TextField
              select
              label="Theme"
              value={settings.preferences.theme}
              onChange={(e) => handleSettingChange('preferences', 'theme', e.target.value)}
              fullWidth
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </TextField>
            
            <TextField
              select
              label="Language"
              value={settings.preferences.language}
              onChange={(e) => handleSettingChange('preferences', 'language', e.target.value)}
              fullWidth
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </TextField>
            
            <TextField
              select
              label="Units"
              value={settings.preferences.units}
              onChange={(e) => handleSettingChange('preferences', 'units', e.target.value)}
              fullWidth
            >
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, ft)</option>
            </TextField>
          </Stack>
        </Paper>

        {/* Account Actions */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Account Actions
          </Typography>
          
          <Stack spacing={2}>
            <Button
              variant="outlined"
              startIcon={<SecurityIcon />}
              onClick={() => setShowPasswordDialog(true)}
              fullWidth
            >
              Change Password
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setShowDeleteDialog(true)}
              fullWidth
            >
              Delete Account
            </Button>
          </Stack>
        </Paper>

        {/* Save Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            onClick={handleSaveSettings}
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            Save Settings
          </Button>
        </Box>
      </Stack>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onClose={handleClosePasswordDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Current Password"
              type={showPasswords.current ? 'text' : 'password'}
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
              InputProps={{
                endAdornment: (
                  <Button
                    size="small"
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                  >
                    {showPasswords.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                )
              }}
            />
            <TextField
              fullWidth
              label="New Password"
              type={showPasswords.new ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
              InputProps={{
                endAdornment: (
                  <Button
                    size="small"
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  >
                    {showPasswords.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                )
              }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type={showPasswords.confirm ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              InputProps={{
                endAdornment: (
                  <Button
                    size="small"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  >
                    {showPasswords.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </Button>
                )
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog}>Cancel</Button>
          <Button 
            onClick={handlePasswordChange} 
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Change Password'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onClose={handleCloseDeleteDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button 
            onClick={handleDeleteAccount} 
            color="error" 
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Delete Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings;
