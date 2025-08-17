import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  TextField,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
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
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match!' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long!' });
      return;
    }

    setLoading(true);
    try {
      // Here you would make an API call to change password
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setShowPasswordDialog(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to change password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      // Here you would make an API call to delete account
      logout();
      setShowDeleteDialog(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete account. Please try again.' });
    } finally {
      setLoading(false);
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

      <Grid container spacing={3}>
        {/* Notifications Settings */}
        <Grid item xs={12} md={6}>
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
        </Grid>

        {/* Privacy Settings */}
        <Grid item xs={12} md={6}>
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
        </Grid>

        {/* Preferences */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PaletteIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Preferences
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            </Box>
          </Paper>
        </Grid>

        {/* Account Actions */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Account Actions
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            </Box>
          </Paper>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
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
        </Grid>
      </Grid>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              label="Current Password"
              type={showPasswords.current ? 'text' : 'password'}
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                  >
                    {showPasswords.current ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
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
                  <IconButton
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  >
                    {showPasswords.new ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
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
                  <IconButton
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  >
                    {showPasswords.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                )
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordDialog(false)}>Cancel</Button>
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
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
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
