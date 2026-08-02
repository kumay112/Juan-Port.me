import os
import subprocess

commits = subprocess.check_output(['git', 'log', '--format=%h', '--reverse']).decode('utf-8').strip().split('\n')
dates = [
    "2026-08-02T10:15:00",
    "2026-08-04T14:30:00",
    "2026-08-07T09:45:00",
    "2026-08-10T11:20:00",
    "2026-08-13T16:45:00",
    "2026-08-16T21:00:00"
]

# Create an orphan branch
subprocess.run(['git', 'checkout', '--orphan', 'new-main'])
# Remove all tracked files from index to start fresh
subprocess.run(['git', 'rm', '-rf', '.'], stdout=subprocess.DEVNULL)

for i in range(len(commits)):
    c = commits[i]
    d = dates[i] if i < len(dates) else dates[-1]
    
    # Checkout files from the original commit into index
    subprocess.run(['git', 'checkout', c, '--', '.'])
    
    # Add all files (including untracked ones that checkout might have missed, though it shouldn't)
    subprocess.run(['git', 'add', '.'])
    
    # Get original commit message
    msg = subprocess.check_output(['git', 'log', '-1', '--format=%B', c]).decode('utf-8').strip()
    
    # Commit with new date
    env = os.environ.copy()
    env['GIT_AUTHOR_DATE'] = d
    env['GIT_COMMITTER_DATE'] = d
    subprocess.run(['git', 'commit', '-m', msg], env=env)

# Force branch main to point to our new history
subprocess.run(['git', 'branch', '-D', 'main'])
subprocess.run(['git', 'branch', '-M', 'main'])
