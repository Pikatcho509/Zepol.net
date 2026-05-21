# Zepòl v18.0.43 - Testing Guide

## 🧪 Quick Tests to Verify Implementations

### 1. Time-Based Greeting ✅
- **How to test**: Refresh the page at different times
- **Expected**: 
  - Before 12:00 PM: "Bonjou" 
  - 12:00 PM - 6:00 PM: "Bon apremidi"
  - After 6:00 PM: "Bonswa"
- **Location**: Top of home page, next to quote

### 2. Victory & Hope - Author-Only Comments ✅
- **How to test**:
  1. Log in as User A
  2. Post a story in "Viktwa & Espwa" section
  3. Log out and log in as User B
  4. Go to that story and try to add a comment
- **Expected**: "Sèlman otem istwa a ka reponn nan kòmantè yo." (Only author can reply)
- **Verify with Author**: 
  1. Log in as User A
  2. Go to your story
  3. You should be able to comment/reply

### 3. Message Search & Filtering ✅
- **How to test**:
  1. Go to Messages section
  2. Type in search box (search for friend names)
  3. Click filter buttons: "Tout", "Pa li", "Li"
- **Expected**: 
  - Friend list filters in real-time
  - Filter buttons show active state (blue/white)
  - Messages filtered by read status

### 4. DLS Code 30-Minute Expiry ✅
- **How to test**:
  1. Go to Games/DLS section
  2. Share a code
  3. Note the "Rete X minit" timer
- **Expected**: 
  - Codes expire after 30 minutes (not 10)
  - Timer counts down
  - Expired codes disappear automatically

### 5. Gratitude Box Persistence ✅
- **How to test**:
  1. Go to Wellness > Gratitude Box
  2. Add a message ("Mèsi pou..." or similar)
  3. Close browser or refresh page
  4. Return to Gratitude Box and click "Siw yon mesaj"
- **Expected**:
  - Message appears after page reload
  - Works even if offline
  - Syncs to Firebase when online

### 6. Bookmark System ✅
- **How to test**:
  1. Go to Resources > Articles
  2. Click heart icon on any article
  3. Heart turns red (bookmarked)
  4. Close and reopen Resources section
- **Expected**:
  - Bookmarked items stay marked
  - Heart icon is red when bookmarked
  - Gray when not bookmarked
  - Bookmarks persist after page reload

### 7. Data Storage (Offline/Online) ✅
- **How to test**:
  1. Open DevTools (F12)
  2. Go to Application > Local Storage
  3. Check for keys:
     - `zepol_support_jar` (gratitude messages)
     - `zepol_bookmarks` (bookmarks)
     - `zepol_mood_logs` (mood tracking)
- **Expected**: Data saved to localStorage for offline support

## 🔍 Advanced Testing

### Firebase Sync Check
1. Add gratitude message while **logged in**
2. Open Firebase Console > Firestore
3. Check `users/{userId}/gratitudeNotes` collection
4. Message should be stored there too

### Message Filtering Demo
1. Go to Inbox
2. Unread messages shown differently
3. Click "Pa li" filter
4. Only unread messages appear
5. Click "Li" filter
6. Only read messages appear

### Search Functionality
1. Go to Messages
2. Search for friend: Type "Dr" (for Dr. Jeudy)
3. List filters to show matching friends
4. Search for message content: Type "Bonjou"
5. Friends with that message show up

## ✅ Checklist for Completion

- [ ] Time-based greeting works for all times
- [ ] Comment author restriction prevents non-author replies
- [ ] Message search finds friends by name and content
- [ ] Message filter buttons work (All/Read/Unread)
- [ ] DLS code shows "Rete 30 minit" (not 10)
- [ ] Gratitude box messages persist after reload
- [ ] Bookmark icons change color when clicked
- [ ] localStorage contains expected keys
- [ ] App works offline with localStorage
- [ ] App syncs with Firebase when online

## 🐛 Troubleshooting

### Greeting not changing?
- Check browser time settings
- Refresh page with F5 (hard refresh)
- Check console for errors (F12)

### Comments still appearing from non-authors?
- Reload page after login
- Check that post has `authorId` field
- Verify current user has different UID than post author

### Bookmarks not persisting?
- Check localStorage isn't full (F12 > Application)
- Clear cache and cookies
- Log in to sync with Firebase

### DLS codes showing 10 minutes?
- Hard refresh (Ctrl+F5)
- Check main.js was updated (search for THIRTY_MINUTES)
- Verify timestamp is being set on new codes

## 📞 Support
If any test fails, check:
1. Browser console (F12 > Console tab) for error messages
2. Network tab for API calls
3. localStorage (F12 > Application tab) for stored data
4. Firebase console if logged in
